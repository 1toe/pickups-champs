import { SUPPORT_POOL, ADC_POOL } from "../constants/champions";



// Obtener el último parche de League of Legends desde la API de Data Dragon
// Funcionamiento:
// 1. Realiza una solicitud fetch a la URL de versiones de Data Dragon.
// 2. Parsea la respuesta JSON para obtener un array de versiones.
// 3. Retorna la primera versión del array, que corresponde al último parche.

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
export async function getInfoChampion(champ: string) {
    const patch = await ultimoParche();
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/es_ES/champion/${champ}.json`);
    const data = await res.json();
    return data;
}



// END POINT Square: https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ}.png

// Desglose:
// - La función es asíncrona y devuelve una promesa que resuelve a un string.
// - Utiliza fetch para obtener datos de la API de Data Dragon.
// - La respuesta se convierte a JSON y se asume que es un array de strings.
// - Se retorna el primer elemento del array, que representa la versión más reciente.

// Terminologia:
// export: Permite que la función sea utilizada en otros módulos.
// async/await: Forma de manejar operaciones asíncronas en JavaScript.
// fetch: Función para hacer solicitudes HTTP, recordar que HTTP es un protocolo de comunicación en la web.
// versiones[0]: Accede al primer elemento del array de versiones.
// Promise<string>: Indica que la función devuelve una promesa que resolverá a un string.
// Promesa: "Objeto" que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante.
// Ejemplo de promesa en una heladeria:
// Pedir un helado (operación asíncrona)
// -> Esperar a que lo preparen (promesa)
// -> Recibir el helado (valor resultante)