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

// Definir el pool de campeones Support
// Funcionamiento:
// 1. Organiza los campeones en sub-arreglos para representar grupos o categorías.
// 2. Cada sub-arreglo contiene nombres de campeones como strings.
// 3. Facilita la iteración y selección aleatoria en la aplicación.
// Si es necesario, revisar: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// Palabras claves: pool, support, campeón, array, subgrupos, strings

export const SUPPORT_POOL = [
    ["Janna", "Lulu", "Milio", "Nami", "Rell", "Seraphine"],
    ["Braum", "Karma", "Lux", "Morgana", "Neeko", "Rakan"],
    ["Senna", "Sona", "Taric"]
];

// Definir el pool de campeones ADC
// Funcionamiento:
// 1. Organiza los campeones ADC en sub-arreglos similares a SUPPORT_POOL.
// 2. Permite la gestión separada de roles para matching synergético.
// 3. Los nombres deben coincidir exactamente con los de Data Dragon.
// Si es necesario, revisar: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// Palabras claves: pool, ADC, campeón, array, subgrupos, strings, synergia

export const ADC_POOL = [
    ["Aphelios", "Caitlyn", "Ezreal", "Jhin", "Kaisa", "MissFortune"],
    ["Samira", "Tristana", "Vayne", "Xayah", "Zeri"]
];


