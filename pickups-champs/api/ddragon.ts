import { SUPPORT_POOL, ADC_POOL } from "../constants/champions";

// Obtener el último parche de League of Legends desde la API de Data Dragon
// Funcionamiento:
// 1. Realiza una solicitud fetch a la URL de versiones de Data Dragon.
// 2. Parsea la respuesta JSON para obtener un array de versiones.
// 3. Retorna la primera versión del array, que corresponde al último parche.
// Si es necesario, revisar: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Palabras claves: fetch, JSON, array, versiones, parche, API

export async function ultimoParche(): Promise<string> {
    const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const versiones: string[] = await res.json();
    return versiones[0]; // Último parche
}

// Obtener cada icono de campeón.
// Funcionamiento:
// 1. Llama a la función ultimoParche para obtener la versión más reciente del juego.
// 2. Itera sobre el SUPPORT_POOL para construir un objeto con las URLs de los iconos de los campeones.
// 3. Retorna un objeto donde las claves son los nombres de los campeones y los valores son las URLs de sus iconos.
// Si es necesario, revisar: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
// Palabras claves: icono, campeón, URL, iteración, objeto, Record

export async function getIconoChampion() {
    const patch = await ultimoParche();
    const urls: Record<string, string> = {};

    // Combinar ambos pools de campeones, solamente vienen de
    const todosLosCampeones = [...SUPPORT_POOL.flat(), ...ADC_POOL.flat()];

    todosLosCampeones.forEach(champ => {
        urls[champ] = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ}.png`;
    });

    return urls;
}

// Obtener información detallada de un campeón específico.
// Funcionamiento:
// 1. Llama a la función ultimoParche para obtener la versión más reciente del juego.
// 2. Realiza una solicitud fetch a la URL específica del campeón en la API de Data Dragon.
// 3. Parsea la respuesta JSON y retorna los datos del campeón (Este está en SUPPORT_POOL o ADC_POOL).
// Si es necesario, revisar: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// Palabras claves: detalle, campeón, fetch, JSON, data, español

export async function getInfoChampion(champ: string) {
    const patch = await ultimoParche();
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/es_ES/champion/${champ}.json`);
    const data = await res.json();
    return data;
}

// Obtener detalle de un campeón por nombre (Data Dragon)
// Funcionamiento:
// 1. Llama a la función ultimoParche para obtener la versión más reciente del juego.
// 2. Realiza una solicitud fetch a la URL específica del campeón en la API de Data Dragon con locale español.
// 3. Parsea la respuesta JSON y retorna los datos específicos del campeón.
// Si es necesario, revisar: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
// Palabras claves: detalle, campeón, nombre, fetch, JSON, data, español, locale

export async function getChampionDetail(name: string): Promise<any> {
    const patch = await ultimoParche();
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/es_ES/champion/${name}.json`);
    const data = await res.json();
    return data.data[name];
}