import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.AUDIT_URL || 'http://localhost:3000';
const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-K3MFCQHF4R';
const key = 'seya-analytics-consent-v2';
const output = new URL('../test-results/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch(process.platform === 'darwin' ? { executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' } : {});
const report = { checks: [], accessibility: [], pageErrors: [] };
const google = /https:\/\/([^/]*\.)?(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net)\//;
const queue = (page) => page.evaluate(() => (window.dataLayer || []).map((command) => Array.from(command)));
const events = async (page) => (await queue(page)).filter((command) => command[0] === 'event');
async function fixture(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const requests = [];
  await context.route(google, async (route) => {
    requests.push(route.request().url());
    if (route.request().url().startsWith(`https://www.googletagmanager.com/gtag/js?id=${id}`)) {
      if (options.waitForScript) await options.waitForScript;
      if (options.failScript) return route.abort();
      return route.fulfill({ contentType: 'text/javascript', body: 'window.__gaMockLoaded = true;' });
    }
    await route.abort(); // Never send test traffic to a real analytics property.
  });
  context.on('page', (page) => page.on('pageerror', (error) => report.pageErrors.push(error.message)));
  const page = await context.newPage();
  return { context, page, requests };
}
async function checkAccessibility(page, name) {
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  report.accessibility.push({ name, violations: axe.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })) });
  assert.equal(axe.violations.length, 0, `${name}: accessibility`);
}
function passed(name) { report.checks.push(name); console.log(`✓ ${name}`); }
try {
  const first = await fixture();
  await first.page.goto(base, { waitUntil: 'networkidle' });
  await expect(first.page.locator('.consent-banner')).toBeVisible();
  assert.equal(first.requests.length, 0);
  assert.equal((await first.context.cookies()).filter((cookie) => cookie.name.startsWith('_ga')).length, 0);
  await checkAccessibility(first.page, 'Desktop cookie banner');
  await first.page.screenshot({ path: new URL('cookies-banner-desktop.png', output).pathname });
  const styles = await first.page.locator('.consent-banner .consent-actions button').evaluateAll((buttons) => buttons.slice(0, 2).map((button) => {
    const style = getComputedStyle(button); return [style.color, style.backgroundColor, style.border, style.fontSize, style.padding];
  }));
  assert.deepEqual(styles[0], styles[1], 'Acceptance and refusal have equal styling');
  await first.page.getByRole('button', { name: 'Personnaliser', exact: true }).click();
  await expect(first.page.getByRole('dialog')).toBeVisible();
  await expect(first.page.locator('#cookie-analytics')).not.toBeChecked();
  await checkAccessibility(first.page, 'Desktop preference dialog');
  await first.page.keyboard.press('Escape');
  await expect(first.page.getByRole('button', { name: 'Personnaliser', exact: true })).toBeFocused();
  await first.page.getByRole('button', { name: 'Tout refuser', exact: true }).click();
  await expect(first.page.locator('.consent-banner')).not.toBeVisible();
  const denied = await first.page.evaluate((key) => JSON.parse(localStorage.getItem(key)), key);
  assert.equal(denied.analytics, 'denied');
  await first.page.goto(`${base}/contact?email=private%40example.com`, { waitUntil: 'networkidle' });
  await expect(first.page.locator('.consent-banner')).not.toBeVisible();
  assert.equal(first.requests.length, 0);
  assert.equal((await queue(first.page)).length, 0);
  passed('No Google requests before choice or after persisted refusal; equal buttons; default unchecked; Escape restores focus');

  await first.page.getByRole('button', { name: 'Gérer les cookies', exact: true }).click();
  await first.page.locator('#cookie-analytics').check();
  await first.page.getByRole('button', { name: 'Enregistrer mes choix', exact: true }).click();
  await expect.poll(async () => (await events(first.page)).filter((event) => event[1] === 'page_view').length).toBe(1);
  assert.equal(first.requests.length, 1);
  const commands = await queue(first.page);
  assert.deepEqual(commands[0].slice(0, 2), ['consent', 'default']);
  assert.equal(commands[0][2].analytics_storage, 'denied');
  const config = commands.find((command) => command[0] === 'config');
  assert.equal(config[1], id);
  assert.equal(config[2].send_page_view, false);
  assert.equal(config[2].allow_google_signals, false);
  assert.equal(config[2].allow_ad_personalization_signals, false);
  assert.equal(config[2].cookie_update, false);
  assert.equal(config[2].cookie_expires, 31536000);
  assert.equal(commands.find((command) => command[0] === 'consent' && command[1] === 'update')[2].ad_storage, 'denied');
  assert.equal((await events(first.page))[0][2].page_location, `${base}/contact`);
  assert.ok(!JSON.stringify(commands).includes('private'));
  await first.page.locator('#name').fill('PRIVATE PERSON');
  await expect.poll(async () => (await events(first.page)).filter((event) => event[1] === 'contact_started').length).toBe(1);
  assert.ok(!JSON.stringify(await queue(first.page)).includes('PRIVATE PERSON'));
  await first.page.locator('.desktop-nav').getByRole('link', { name: 'Formations', exact: true }).click();
  await expect(first.page).toHaveURL(`${base}/formations`);
  await expect.poll(async () => (await events(first.page)).filter((event) => event[1] === 'page_view').length).toBe(2);
  assert.equal(first.requests.length, 1, 'Only one tag on SPA navigation');
  const views = (await events(first.page)).filter((event) => event[1] === 'page_view');
  assert.equal(views[1][2].page_referrer, `${base}/contact`);
  await first.page.evaluate(() => window.dispatchEvent(new CustomEvent('seya:analytics', { detail: { event: 'unknown', email: 'secret@example.com' } })));
  assert.equal((await events(first.page)).filter((event) => event[1] === 'unknown').length, 0);
  passed('Explicit consent starts the correct GA4 tag; manual SPA views are unique; advertising denied; custom payloads omit form values and URL queries');

  const second = await first.context.newPage();
  await second.goto(`${base}/solutions/application-metier`, { waitUntil: 'networkidle' });
  await expect.poll(async () => (await events(second)).filter((event) => event[1] === 'service_viewed').length).toBe(1);
  await first.context.addCookies([
    { name: '_ga', value: 'fake-test-cookie', url: base },
    { name: `_ga_${id.slice(2)}`, value: 'fake-session-cookie', url: base },
    { name: 'essential-test-cookie', value: 'preserve', url: base },
  ]);
  await first.page.getByRole('button', { name: 'Gérer les cookies', exact: true }).click();
  await expect(first.page.locator('#cookie-analytics')).toBeChecked();
  await first.page.getByRole('dialog').getByRole('button', { name: 'Tout refuser', exact: true }).click();
  await expect.poll(() => second.evaluate((id) => window[`ga-disable-${id}`], id)).toBe(true);
  assert.equal(await first.page.evaluate((id) => window[`ga-disable-${id}`], id), true);
  const cookies = await first.context.cookies();
  assert.equal(cookies.filter((cookie) => cookie.name.startsWith('_ga')).length, 0);
  assert.ok(cookies.some((cookie) => cookie.name === 'essential-test-cookie'));
  const before = (await events(first.page)).length;
  await first.page.evaluate(() => window.dispatchEvent(new CustomEvent('seya:analytics', { detail: { event: 'hero_cta_click' } })));
  assert.equal((await events(first.page)).length, before);
  passed('Withdrawal immediately disables both tabs, removes only analytics cookies and prevents further custom events');
  await first.context.close();

  const mobile = await fixture();
  await mobile.page.setViewportSize({ width: 375, height: 667 });
  await mobile.page.goto(base, { waitUntil: 'networkidle' });
  await expect(mobile.page.locator('.consent-banner')).toBeVisible();
  assert.equal(await mobile.page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await checkAccessibility(mobile.page, 'Mobile cookie banner');
  await mobile.page.screenshot({ path: new URL('cookies-banner-mobile.png', output).pathname });
  await mobile.page.getByRole('button', { name: 'Personnaliser', exact: true }).click();
  await checkAccessibility(mobile.page, 'Mobile preference dialog');
  assert.equal(await mobile.page.locator('.cookie-dialog').evaluate((dialog) => dialog.scrollWidth > dialog.clientWidth), false);
  await mobile.page.screenshot({ path: new URL('cookies-dialog-mobile.png', output).pathname });
  await mobile.page.getByRole('button', { name: 'Enregistrer mes choix', exact: true }).click();
  assert.equal(mobile.requests.length, 0, 'Customisation without opt-in means refusal');
  await mobile.page.evaluate((key) => {
    const now = new Date(); now.setUTCMonth(now.getUTCMonth() - 7);
    localStorage.setItem(key, JSON.stringify({ version: 2, analytics: 'granted', decidedAt: now.getTime(), expiresAt: Date.now() - 1 }));
  }, key);
  await mobile.page.reload({ waitUntil: 'networkidle' });
  await expect(mobile.page.locator('.consent-banner')).toBeVisible();
  assert.equal(mobile.requests.length, 0);
  passed('Mobile banner and native dialog have no overflow or accessibility violations; personalised refusal and expired consent block Google');
  await mobile.context.close();

  let release;
  const waitForScript = new Promise((resolve) => { release = resolve; });
  const race = await fixture({ waitForScript });
  await race.page.goto(base, { waitUntil: 'networkidle' });
  await race.page.getByRole('button', { name: 'Tout accepter', exact: true }).click();
  await expect.poll(() => race.requests.length).toBe(1);
  await race.page.getByRole('button', { name: 'Gérer les cookies', exact: true }).click();
  await race.page.getByRole('dialog').getByRole('button', { name: 'Tout refuser', exact: true }).click();
  release();
  await race.page.waitForFunction(() => window.__gaMockLoaded === true);
  assert.equal((await queue(race.page)).filter((command) => command[0] === 'config').length, 0);
  assert.equal((await events(race.page)).length, 0);
  passed('Withdrawal while the Google script is loading prevents late configuration and pageviews');
  await race.context.close();

  const blocked = await fixture();
  await blocked.context.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled'); } }));
  await blocked.page.goto(base, { waitUntil: 'networkidle' });
  await blocked.page.getByRole('button', { name: 'Tout accepter', exact: true }).click();
  await expect(blocked.page.getByRole('status')).toContainText('désactivée');
  assert.equal(blocked.requests.length, 0);
  passed('Unavailable storage fails closed with an explanation to the visitor');
  await blocked.context.close();
  assert.deepEqual(report.pageErrors, []);
} finally {
  await writeFile(new URL('cookies-audit.json', output), JSON.stringify(report, null, 2));
  await browser.close();
}
