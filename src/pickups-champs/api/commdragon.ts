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
} [
    "https://cdn.communitydragon.org/15.24.1/champion/generic/square",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/square",
    "https://cdn.communitydragon.org/15.24.1/champion/1/square",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/data",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/data",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/splash-art",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/splash-art",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/splash-art/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/splash-art/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/splash-art/centered",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/splash-art/centered",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/splash-art/centered/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/splash-art/centered/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/champ-select/sounds/ban",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/champ-select/sounds/ban",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/champ-select/sounds/choose",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/champ-select/sounds/choose",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/champ-select/sounds/sfx",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/champ-select/sounds/sfx",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/tile",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/tile",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/tile/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/tile/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/portrait",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/portrait",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/portrait/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/portrait/skin/:skinId",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/ability-icon/passive",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/ability-icon/passive",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/ability-icon/p",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/ability-icon/p",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/ability-icon/q",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/ability-icon/q",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/ability-icon/w",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/ability-icon/w",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/ability-icon/e",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/ability-icon/e",
    "https://cdn.communitydragon.org/15.24.1/champion/:championKey/ability-icon/r",
    "https://cdn.communitydragon.org/15.24.1/champion/:championId/ability-icon/r",
    "https://cdn.communitydragon.org/15.24.1/honor/generic",
    "https://cdn.communitydragon.org/15.24.1/honor/:honorId",
    "https://cdn.communitydragon.org/15.24.1/honor/:honorId/locked",
    "https://cdn.communitydragon.org/15.24.1/honor/:honorId/level/:level",
    "https://cdn.communitydragon.org/15.24.1/honor/emblem/generic",
    "https://cdn.communitydragon.org/15.24.1/honor/emblem/:honorId",
    "https://cdn.communitydragon.org/15.24.1/honor/emblem/:honorId/locked",
    "https://cdn.communitydragon.org/15.24.1/honor/emblem/:honorId/level/:level",
    "https://cdn.communitydragon.org/15.24.1/ward/:wardId",
    "https://cdn.communitydragon.org/15.24.1/ward/:wardId/shadow",
    "https://cdn.communitydragon.org/15.24.1/profile-icon/:profileIconId"
  ]
