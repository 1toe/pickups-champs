import { useState, useEffect } from "react";
import { getIconoChampion } from "../api/ddragon"; // Agregar despues: getInfoChampion
 
export default function useChampionAssets() {
    const [championUrls, setChampionUrls] = useState<Record<string, string>>({});

    useEffect(() => {
        async function fetchAssets() {
            const urls = await getIconoChampion();
            setChampionUrls(urls);
        }

        fetchAssets();
    }, []);

    return championUrls;
}
