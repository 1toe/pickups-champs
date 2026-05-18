// Clase para argumentos de localización y versión
// Funcionamiento:
// 1. Define propiedades para locale y version.
// 2. Constructor toma un objeto con locale y version y los asigna.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, constructor, properties, locale, version

export class LocaleVersionArgs {
  locale: string;
  version: string

  constructor({locale, version}: {locale: string, version: string}) {
    this.locale = locale;
    this.version = version;
  }
}

// Clase abstracta base para objetos de Community Dragon
// Funcionamiento:
// 1. Define URL base para API.
// 2. Proporciona métodos para resolver rutas de cliente y juego.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes
// Palabras claves: abstract, class, static, methods, path, resolve

export abstract class CommunityDragonObject {
  static url = "/api";

  resolveClientPath({path, args}: {path: string, args: LocaleVersionArgs}): string {
    const uri = path.replace("/lol-game-data/assets", "").toLowerCase();
    return `${CommunityDragonObject.url}/${args.version}/plugins/rcp-be-lol-game-data/global/${args.locale}/${uri}`;
  }

  resolveGamePath({path, version}: {path: string, version: string}): string {
    const uri = path.replace("/lol-game-data/assets/ASSETS/", "").replace(".jpg", ".png").toLowerCase();
    return `${CommunityDragonObject.url}/${version}/game/assets/${uri}`;
  }
}

// Clase para representar un campeón
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor parsea JSON y asigna propiedades.
// 3. Incluye skins, passive, spells.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, properties, skins, spells

export class Champion extends CommunityDragonObject {
  id: number;
  name: string;
  alias: string;
  title: string;
  shortBio: string;
  playstyleInfo: PlaystyleInfo;
  skins: Array<Skin>;
  passive: Passive;
  spells: Array<Spell>;

  constructor(json: any) {
    super();
    
    this.id = json.id;
    this.name = json.name;
    this.alias = json.alias;
    this.title = json.title;
    this.shortBio = json.shortBio;
    this.playstyleInfo = new PlaystyleInfo(json.playstyleInfo);
    this.skins = json.skins.map((x: any) => new Skin(x));
    this.passive = new Passive(json.passive);
    this.spells = json.spells.map((x: any) => new Spell(x));
  }
}

// Clase para información de estilo de juego
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna valores de daño, durabilidad, etc.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, properties, playstyle

export class PlaystyleInfo extends CommunityDragonObject {
  damage: number;
  durability: number;
  crowdControl: number;
  mobility: number;
  utility: number;

  constructor(json: any) {
    super();

    this.damage = json.damage;
    this.durability = json.durability;
    this.crowdControl = json.crowdControl;
    this.mobility = json.mobility;
    this.utility = json.utility;
  }
}

// Clase para skin de campeón
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de skin.
// 3. Métodos para obtener URLs de imágenes.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, methods, images, skin

export class Skin extends CommunityDragonObject {
  id: number;
  isBase: boolean;
  name: string;
  rarity: string;
  isLegacy: boolean;
  loadScreenPath: string;
  splashPath: string;
  uncenteredSplashPath: string;
  tilePath: string;
  description?: string;
  skinLines?: Array<SkinLine>;


  constructor(json: any) {
    super();

    this.id = json.id;
    this.isBase = json.isBase;
    this.name = json.name;
    this.rarity = json.rarity;
    this.isLegacy = json.isLegacy;
    this.loadScreenPath = json.loadScreenPath;
    this.splashPath = json.splashPath;
    this.uncenteredSplashPath = json.uncenteredSplashPath;
    this.tilePath = json.tilePath;
    this.description = json.description;
    this.skinLines = json.skinLines?.map((x: any) => new SkinLine(x)) ?? null;
  }

  getLoadScreen(version: string): string {
    return this.resolveGamePath({path: this.loadScreenPath, version: version});
  }

  getSplash(args: LocaleVersionArgs): string {
    return this.resolveClientPath({path: this.splashPath, args: args});
  }

  getUncenteredSplash(args: LocaleVersionArgs): string {
    return this.resolveClientPath({path: this.uncenteredSplashPath, args: args});
  }

  getTile(args: LocaleVersionArgs): string {
    return this.resolveClientPath({path: this.tilePath, args: args});
  }
}

// Clase para línea de skin
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna id.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, id, skinLine

export class SkinLine extends CommunityDragonObject {
  id: number;

  constructor(json: any) {
    super();

    this.id = json.id;
  }
}

// Clase para pasiva de campeón
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna nombre, icono, descripción.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, passive, icon

export class Passive extends CommunityDragonObject {
  name: string;
  abilityIconPath: string;
  description: string;

  constructor(json: any) {
    super();

    this.name = json.name;
    this.abilityIconPath = json.abilityIconPath;
    this.description = json.description;
  }

  getAbilityIcon(version: string): string {
    return this.resolveGamePath({ path: this.abilityIconPath, version: version});
  }
}

// Clase para hechizo de campeón
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna clave, nombre, icono, descripción.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, spell, icon

export class Spell extends CommunityDragonObject {
  spellKey: string;
  name: string;
  abilityIconPath: string;
  description: string;

  constructor(json: any) {
    super();

    this.spellKey = json.spellKey;
    this.name = json.name;
    this.abilityIconPath = json.abilityIconPath;
    this.description = json.description;
  }

  getAbilityIcon(version: string): string {
    return this.resolveGamePath({ path: this.abilityIconPath, version: version});
  }
}

// Clase para resumen de campeón
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna id, nombre, alias, path de retrato.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, summary, icon

export class ChampionSummary extends CommunityDragonObject {
  id: number;
  name: string;
  alias: string;
  squarePortraitPath: string;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.name = json.name;
    this.alias = json.alias;
    this.squarePortraitPath = json.squarePortraitPath;
  }

  getIcon(args: LocaleVersionArgs): string {
    return this.resolveClientPath({path: this.squarePortraitPath, args: args});
  }
}

// Clase para ítem
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de ítem.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, item, icon

export class Item extends CommunityDragonObject {
  id: number;
  name: string;
  description: string;
  active: boolean;
  inStore: boolean;
  from: Array<number>;
  to: Array<number>;
  categories: Array<number>;
  price: number;
  priceTotal: number;
  iconPath: string;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.active = json.active;
    this.inStore = json.inStore;
    this.from = json.from;
    this.to = json.to;
    this.categories = json.categories;
    this.price = json.price;
    this.priceTotal = json.priceTotal;
    this.iconPath = json.iconPath;
  }

  getIcon(version: string): string {
    return this.resolveGamePath({path: this.iconPath, version: version});
  }
}

// Clase para perk (runa)
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de perk.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, perk, icon

export class Perk extends CommunityDragonObject {
  id: number;
  name: string;
  shortDesc: string;
  longDesc: string;
  iconPath: string;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.name = json.name;
    this.shortDesc = json.shortDesc;
    this.longDesc = json.longDesc;
    this.iconPath = json.iconPath;
  }

  getIcon(version: string): string {
    return this.resolveClientPath({path: this.iconPath, args: {version: version, locale: "default"}});
  }
}

// Clase para emote de invocador
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de emote.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, emote, icon

export class SummonerEmote extends CommunityDragonObject {
  id: number;
  name: string;
  inventoryIcon: string;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.name = json.name;
    this.inventoryIcon = json.inventoryIcon;
  }

  getInventoryIcon(version: string): string {
    return this.resolveClientPath({path: this.inventoryIcon, args: {locale: "default", version: version}});
  }
}

// Clase para icono de invocador
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de icono.
// 3. Método para obtener URL de imagen.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, icon, image

export class SummonerIcon extends CommunityDragonObject {
  id: number;
  title: string;
  yearReleased: number;
  isLegacy: boolean;
  imagePath?: string;
  descriptions: Array<Description>;
  rarities: Array<Rarity>;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.title = json.title;
    this.yearReleased = json.yearReleased;
    this.isLegacy = json.isLegacy;
    this.imagePath = json.imagePath;
    this.descriptions = json.descriptions.map((x: any) => new Description(x));
    this.rarities = json.rarities.map((x: any) => new Rarity(x));
  }

  getImage(version: string): string {
    return this.resolveClientPath({path: this.imagePath ?? "", args: {version: version, locale: "default"}});
  }
}

// Clase para skin de ward
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de ward skin.
// 3. Métodos para obtener URLs de imágenes.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, ward, skin, image

export class WardSkin extends CommunityDragonObject {
  id: number;
  name: string;
  description : string;
  wardImagePath: string;
  wardShadowImagePath: string;
  isLegacy: boolean;
  regionDescriptions: Array<Description>;
  rarities: Array<Rarity>;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.wardImagePath = json.wardImagePath;
    this.wardShadowImagePath = json.wardShadowImagePath;
    this.isLegacy = json.isLegacy;
    this.regionDescriptions = json.regionalDescriptions.map((x: any) => new Description(x));
    this.rarities = json.rarities.map((x: any) => new Rarity(x));
  }

  getWardImage(version: string): string {
    return this.resolveClientPath({path: this.wardImagePath, args: {locale: "default", version: version}});
  }

  getWardShadowImage(version: string): string {
    return this.resolveClientPath({path: this.wardShadowImagePath, args: {locale: "default", version: version}});
  }
}

// Clase para descripción
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna región y descripción.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, description, region

export class Description extends CommunityDragonObject {
  region: string;
  description: string;

  constructor(json: any) {
    super();
    
    this.region = json.region;
    this.description = json.description;
  }
}

// Clase para rareza
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna región y rareza.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, rarity, region

export class Rarity extends CommunityDragonObject {
  region: string;
  rarity: string;

  constructor(json: any) {
    super();

    this.region = json.region;
    this.rarity = json.rarity;
  }
}

// Clase para compañero
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de compañero.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, companion, icon

export class Companion extends CommunityDragonObject {
  contentId: string;
  itemId: number;
  name: string;
  loadoutsIcon: string;
  description: string;
  level: number;
  speciesName: string;
  speciesId: string;
  rarity: string;
  
  constructor(json: any) {
    super();

    this.contentId = json.contentId;
    this.itemId = json.itemId;
    this.name = json.name;
    this.loadoutsIcon = json.loadoutsIcon;
    this.description = json.description;
    this.level = json.level;
    this.speciesName = json.speciesName;
    this.speciesId = json.speciesId;
    this.rarity = json.rarity;
  }

  getLoadoutsIcon(version: string): string {
    return this.resolveClientPath({path: this.loadoutsIcon, args: {locale: "default", version: version}});
  }
}

// Clase para loot
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de loot.
// 3. Método para obtener URL de imagen.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, loot, image

export class Loot extends CommunityDragonObject {
  id: string;
  name: string;
  description: string;
  image: string;
  mappedStoreId: number;
  rarity: string;
  type: string;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.image = json.image;
    this.mappedStoreId = json.mappedStoreId;
    this.rarity = json.rarity;
    this.type = json.type;
  }

  getImage(version: string): string {
    return this.resolveClientPath({path: this.image, args: {locale: "default", version: version}});
  }
}

// Clase para augmento de cereza
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de augmento.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, augment, icon

export class CherryAugment extends CommunityDragonObject {
  id: number;
  nameTRA: string;
  augmentSmallIconPath: string;
  rarity: string;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.nameTRA = json.nameTRA;
    this.augmentSmallIconPath = json.augmentSmallIconPath;
    this.rarity = json.rarity;
  }

  getAugmentSmallIcon(version: string): string {
    return this.resolveGamePath({path: this.augmentSmallIconPath, version: version});
  }
}

// Clase para universo
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de universo.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, universe, skinSets

export class Universe extends CommunityDragonObject {
  id: number;
  name: string;
  description: string;
  skinSets: Array<number>;

  constructor(json: any) {
    super();

    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.skinSets = json.skinSets;
  }
}

// Clase para ítem de TFT
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de ítem TFT.
// 3. Método para obtener URL del icono cuadrado.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, tft, item, icon

export class TftItem extends CommunityDragonObject {
  guid: string;
  name: string;
  nameId: string;
  id: number;
  color: Color;
  squareIconPath: string;

  constructor(json: any) {
    super();

    this.guid = json.guid;
    this.name = json.name;
    this.nameId = json.nameId;
    this.id = json.id;
    this.color = new Color(json.color);
    this.squareIconPath = json.squareIconPath;
  }

  getSquareIcon(version: string): string {
    return this.resolveGamePath({path: this.squareIconPath, version: version});
  }
}

// Clase para color
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna componentes RGBA.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, color, rgba

export class Color extends CommunityDragonObject {
  R: number;
  B: number;
  G: number;
  A: number;

  constructor(json: any) {
    super();

    this.R = json.R;
    this.B = json.B;
    this.G = json.G;
    this.A = json.A;
  }
}

// Clase para skin de mapa TFT
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de skin de mapa.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, tft, map, skin, icon

export class TftMapSkin extends CommunityDragonObject {
  contentId: string;
  itemId: number;
  name: string;
  loadoutsIcon: string;
  groupId: number;
  groupName: string;
  rarity: string;
  rarityValue: number;

  constructor(json: any) {
    super();

    this.contentId = json.contentId;
    this.itemId = json.itemId;
    this.name = json.name;
    this.loadoutsIcon = json.loadoutsIcon;
    this.groupId = json.groupId;
    this.groupName = json.groupName;
    this.rarity = json.rarity;
    this.rarityValue = json.rarityValue;
  }

  getLoadoutsIcon(version: string): string {
    return this.resolveGamePath({path: this.loadoutsIcon, version: version});
  }
}

// Clase para skin de daño TFT
// Funcionamiento:
// 1. Extiende CommunityDragonObject.
// 2. Constructor asigna propiedades de skin de daño.
// 3. Método para obtener URL del icono.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/classes.html
// Palabras claves: class, extends, constructor, tft, damage, skin, icon

export class TftDamageSkin extends CommunityDragonObject {
  contentId: string;
  itemId: number;
  name: string;
  loadoutsIcon: string;
  groupId: number;
  rarity: string;
  rarityValue: number;
  level: number;

  constructor(json: any) {
    super();

    this.contentId = json.contentId;
    this.itemId = json.itemId;
    this.name = json.name;
    this.loadoutsIcon = json.loadoutsIcon;
    this.groupId = json.groupId;
    this.rarity = json.rarity;
    this.rarityValue = json.rarityValue;
    this.level = json.level;
  }

  getLoadoutsIcon(args: LocaleVersionArgs): string {
    return this.resolveClientPath({path: this.loadoutsIcon, args: args});
  }
}