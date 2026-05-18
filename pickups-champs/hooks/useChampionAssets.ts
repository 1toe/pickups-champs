import { useState, useEffect } from "react";
import { getIconoChampion } from "../api/ddragon"; // Agregar despues: getInfoChampion

// Hook personalizado para obtener URLs de iconos de campeones
// Funcionamiento:
// 1. Utiliza useState para almacenar un objeto Record con URLs de iconos.
// 2. En useEffect, llama a getIconoChampion para fetch asíncrono de URLs.
// 3. Actualiza el estado con setChampionUrls cuando los datos llegan.
// 4. Retorna el objeto de URLs para uso en componentes.
// Si es necesario, revisar: https://react.dev/reference/react/useEffect
// Palabras claves: hook, useState, useEffect, fetch, async, Record, URLs, iconos

export default function useChampionAssets() {
    const [championUrls, setChampionUrls] = useState<Record<string, string>>({});

    useEffect(() => {
        // Función interna para manejar el fetch asíncrono
        // Funcionamiento:
        // 1. Llama a getIconoChampion que retorna un objeto con URLs.
        // 2. Actualiza el estado con las URLs obtenidas.
        // Palabras claves: async, function, await, setState
        async function fetchAssets() {
            const urls = await getIconoChampion();
            setChampionUrls(urls);
        }

        fetchAssets();
    }, []);

    return championUrls;
}
