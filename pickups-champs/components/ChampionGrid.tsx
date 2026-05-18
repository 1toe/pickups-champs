import ChampionCard from "./ChampionCard";

// Interfaz para las props del componente ChampionGrid
// Funcionamiento:
// 1. Define las propiedades para renderizar una grid de campeones.
// 2. Incluye título, array de campeones, URLs, callbacks opcionales y estados de selección.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/interfaces.html
// Palabras claves: interface, props, array, Record, callbacks, opcional

interface Props {
    title: string;
    champions: string[];
    urls: Record<string, string>;
    onSelect?: (champ: string) => void;
    onHover?: (champ: string | null) => void;
    selected?: string | null;
    hovered?: string | null;
}

// Componente ChampionGrid para mostrar una grid de campeones
// Funcionamiento:
// 1. Renderiza un contenedor con título y una grid de 3 columnas.
// 2. Mapea el array de campeones a componentes ChampionCard.
// 3. Pasa props relevantes a cada ChampionCard, incluyendo callbacks condicionales.
// 4. Determina si un campeón está resaltado basado en selected o hovered.
// Si es necesario, revisar: https://tailwindcss.com/docs/grid-template-columns
// Palabras claves: componente, grid, map, conditional, props, highlighting

export default function ChampionGrid({ title, champions, urls, onSelect, onHover, selected, hovered }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">
                {title}
            </h2>

            <div className="grid grid-cols-3 gap-3">
                {champions.map((champ) => (
                    <ChampionCard
                        key={champ}
                        name={champ}
                        imageUrl={urls[champ]}
                        onClick={onSelect ? () => onSelect(champ) : undefined}
                        onHoverEnter={onHover ? () => onHover(champ) : undefined}
                        onHoverLeave={onHover ? () => onHover(null) : undefined}
                        isHighlighted={selected === champ || hovered === champ}
                    />
                ))}
            </div>
        </div>
    );
}