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