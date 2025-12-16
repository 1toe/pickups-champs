import { useState, useEffect } from "react";
import { getChampionSplashUrls } from "../api/commdragon";

export default function useChampionAssets() {
    const [championUrls, setChampionUrls] = useState<Record<string, string>>({});

    useEffect(() => {
        async function fetchAssets() {
            const urls = await getChampionSplashUrls();
            setChampionUrls(urls);
        }

        fetchAssets();
    }, []);

    return championUrls;
}
1