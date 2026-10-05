import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
const required = ['LEGAL_COMPANY_NAME', 'LEGAL_COMPANY_FORM', 'LEGAL_ADDRESS', 'LEGAL_REGISTRATION', 'LEGAL_DIRECTOR', 'LEGAL_HOST_NAME', 'LEGAL_HOST_ADDRESS', 'LEGAL_HOST_PHONE'];
const missing = required.filter((key) => !process.env[key]?.trim());
if (process.env.SITE_INDEXABLE !== 'true') missing.push('SITE_INDEXABLE=true on final domain');
if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') console.log('Analytics enabled: verify consent, actual providers and privacy notice.');
if (process.env.CONTACT_ALLOW_LOCAL_PREVIEW === 'true') missing.push('CONTACT_ALLOW_LOCAL_PREVIEW=false');
if (process.env.CONTACT_WEBHOOK_URL && !process.env.CONTACT_WEBHOOK_URL.startsWith('https://')) missing.push('HTTPS CONTACT_WEBHOOK_URL');
if (process.env.UPSTASH_REDIS_REST_URL && !process.env.RATE_LIMIT_SECRET) missing.push('RATE_LIMIT_SECRET for distributed rate limiting');
if (missing.length) { console.error(`Complete before public launch:\n${missing.map((key) => `- ${key}`).join('\n')}`); process.exitCode = 1; }
else console.log('Launch configuration complete. Verify actual contact receipt and hosting before publication.');
