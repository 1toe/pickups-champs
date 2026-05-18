// Interfaz para las props del componente ChampionDetail
// Funcionamiento:
// 1. Define las propiedades requeridas: champion (objeto) y version (string).
// 2. Champion contiene datos del campeón de Data Dragon.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/interfaces.html
// Palabras claves: interface, props, champion, version, any

interface ChampionDetailProps {
    champion: any;
    version: string;
}

// Componente ChampionDetail para mostrar detalles completos de un campeón
// Funcionamiento:
// 1. Renderiza un contenedor con información del campeón: imagen, nombre, título, descripción.
// 2. Muestra estadísticas básicas (ataque, defensa, etc.) y avanzadas (HP, armadura, etc.).
// 3. Lista las habilidades (pasiva y spells) con iconos y descripciones.
// 4. Incluye atributos de accesibilidad como role, aria-labelledby, aria-label.
// Si es necesario, revisar: https://tailwindcss.com/docs/flex
// Palabras claves: componente, detalles, stats, habilidades, accesibilidad, JSX, Tailwind

export default function ChampionDetail({ champion, version }: ChampionDetailProps) {
    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 max-w-md shadow-lg" role="region" aria-labelledby={`champion-${champion.id}`}>
            <div className="flex items-center mb-4">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
                    alt={`Icono de ${champion.name}`}
                    className="w-20 h-20 rounded-md mr-4 object-cover"
                />
                <div>
                    <h3 id={`champion-${champion.id}`} className="text-xl font-bold text-blue-400">{champion.name}</h3>
                    <p className="text-slate-300">{champion.title}</p>
                </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">{champion.blurb}</p>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-2">Estadísticas</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Ataque: <span className="font-bold text-green-400">{champion.info.attack}/10</span></div>
                        <div>Defensa: <span className="font-bold text-blue-400">{champion.info.defense}/10</span></div>
                        <div>Magia: <span className="font-bold text-purple-400">{champion.info.magic}/10</span></div>
                        <div>Dificultad: <span className="font-bold text-red-400">{champion.info.difficulty}/10</span></div>
                        <div>HP: <span className="font-bold">{champion.stats.hp} (+{champion.stats.hpperlevel}/nivel)</span></div>
                        <div>Armadura: <span className="font-bold">{champion.stats.armor} (+{champion.stats.armorperlevel}/nivel)</span></div>
                        <div>Resistencia Mágica: <span className="font-bold">{champion.stats.spellblock} (+{champion.stats.spellblockperlevel}/nivel)</span></div>
                        <div>Daño de Ataque: <span className="font-bold">{champion.stats.attackdamage} (+{champion.stats.attackdamageperlevel}/nivel)</span></div>
                        <div>Velocidad de Movimiento: <span className="font-bold">{champion.stats.movespeed}</span></div>
                        <div>Rango de Ataque: <span className="font-bold">{champion.stats.attackrange}</span></div>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-2">Habilidades</h4>
                    <div className="space-y-3">
                        <div className="flex items-center" aria-label={`Pasiva: ${champion.passive.name}`}>
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champion.passive.image.full}`}
                                alt={`Icono de ${champion.passive.name}`}
                                className="w-10 h-10 rounded mr-3"
                            />
                            <div>
                                <div className="font-semibold text-slate-200">{champion.passive.name}</div>
                                <div className="text-xs text-slate-400">{champion.passive.description}</div>
                            </div>
                        </div>
                        {champion.spells.map((spell: any, index: number) => (
                            <div key={index} className="flex items-center" aria-label={`Habilidad ${index + 1}: ${spell.name}`}>
                                <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                                    alt={`Icono de ${spell.name}`}
                                    className="w-10 h-10 rounded mr-3"
                                />
                                <div>
                                    <div className="font-semibold text-slate-200">{spell.name}</div>
                                    <div className="text-xs text-slate-400">{spell.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}