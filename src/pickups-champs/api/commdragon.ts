import { SUPPORT_POOL } from "../constants/champions";
import { ultimoParche } from "./ddragon";

// Ejemplo: obtener URL de splash art centrado para cada campeón
export async function getChampionSplashUrls() {
    const patch = await ultimoParche();
    const urls: Record<string, string> = {};

    SUPPORT_POOL.flat().forEach(champ => {
        urls[champ] = `https://cdn.communitydragon.org/${patch}/champion/${champ}/splash-art/centered`;
    });

    return urls;
}
