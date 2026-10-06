import assert from "node:assert/strict";
import { test } from "node:test";

/**
 * Le conteneur de balises ne part jamais avant le consentement.
 *
 * L'extrait fourni par Google charge `gtm.js` dès le premier octet, pour tout le
 * monde. Le coller tel quel ferait mentir la bannière de ce site et sa politique
 * de confidentialité. Ce test tient la promesse.
 */

test("l'identifiant de conteneur n'est accepté que dans la forme de Google", () => {
  const forme = /^GTM-[A-Z0-9]+$/;
  for (const id of ["GTM-KQCTPWC9", "GTM-ABC1234"]) {
    assert.ok(forme.test(id), `${id} devrait être accepté`);
  }
  for (const id of ["", "G-K3MFCQHF4R", "GTM-", "gtm-kqctpwc9", "<script>"]) {
    assert.ok(!forme.test(id), `${id} devrait être refusé`);
  }
});

test("sans consentement, aucun script de Tag Manager n'est ajouté au document", async () => {
  const ajoutes: string[] = [];
  (globalThis as Record<string, unknown>).document = {
    createElement: () => ({
      set src(valeur: string) {
        ajoutes.push(valeur);
      },
      remove() {},
    }),
    head: { appendChild() {} },
  };
  (globalThis as Record<string, unknown>).window = {};
  (globalThis as Record<string, unknown>).localStorage = { getItem: () => null };

  process.env.NEXT_PUBLIC_GTM_CONTAINER_ID = "GTM-KQCTPWC9";
  const { startTagManager } = await import("../lib/google-tag-manager.js");

  assert.equal(await startTagManager(), false, "il ne doit pas démarrer sans consentement");
  assert.deepEqual(ajoutes, [], "aucun script ne doit être ajouté");
});
