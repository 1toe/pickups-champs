/**
 * champions.ts
 * -----------------------------
 * 📌 ¿Qué hace este archivo?
 * Contiene una pool actual de supports de campeones organizados para facilitar su selección y gestión.
 *
 * 🗂️ Estructura:
 * - Cada constante representa un campeón (SUPPORT_POOL).
 * - Los campeones están agrupados en sub-arreglos (subgrupos).
 * - Cada nombre de campeón está en formato texto (string).
 *
 * 🎮 Uso:
 * - Consulta rápida de campeones disponibles para roles específicos.
 * - Gestión personalizada de pools para cuentas o estilos de juego.
 */

export const SUPPORT_POOL = [
    ["Janna", "Lulu", "Milio", "Nami", "Rell", "Seraphine"],
    ["Braum", "Karma", "Lux", "Morgana", "Neeko", "Rakan"],
    ["Senna", "Sona", "Taric"]
];

// Pool actual de ADC - Gapetex
export const ADC_POOL = [
    ["Aphelios", "Caitlyn", "Ezreal", "Jhin", "Kai'Sa", "Miss Fortune"],
    ["Samira", "Tristana", "Vayne", "Xayah", "Zeri"]
];
