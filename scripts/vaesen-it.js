// Vaesen - Traduzione italiana
// Traduce i testi che il sistema scrive direttamente nel codice (non passano dal file di lingua).

import { generator_data } from "../../../systems/vaesen/script/util/generator_data.js";
import { GENERATOR_DATA_IT } from "./generator-data-it.js";

const MODULE_ID = "vaesen-it";

function isItalian() {
  return game.i18n?.lang === "it";
}

Hooks.once("init", () => {
  if (!isItalian()) return;

  // Generatore di personaggi (pulsante "Genera PG" sulla scheda): classi, educazioni,
  // professioni, motivazioni, traumi, segreti, doti, avvenimenti ed equipaggiamento.
  for (const [key, value] of Object.entries(GENERATOR_DATA_IT)) {
    generator_data[key] = foundry.utils.deepClone(value);
  }

  console.log(`${MODULE_ID} | Dati del generatore di personaggi tradotti in italiano`);
});

Hooks.once("setup", () => {
  if (!isItalian()) return;

  // Preset del mazzo dell'iniziativa (finestra "Crea mazzo")
  if (CONFIG.Cards?.presets?.initiative) {
    CONFIG.Cards.presets.initiative.label = "Mazzo dell'Iniziativa";
  }
});

// Il titolo della finestra di tiro è scritto nel codice come "Test : <abilità>"
Hooks.on("renderDialog", (app, html) => {
  if (!isItalian()) return;
  const root = app.element?.[0] ?? app.element;
  const title = root?.querySelector?.(".window-title");
  if (title && title.textContent.startsWith("Test : ")) {
    title.textContent = title.textContent.replace(/^Test : /, "Prova: ");
  }
});
