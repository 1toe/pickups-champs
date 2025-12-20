import ChampionCard from "./ChampionCard";

interface Props {
    title: string;          // Nuevo: Le pasamos un título para que sepa qué es
    champions: string[];    // Nuevo: Ya no importa SUPPORT_POOL, recibe cualquier lista
    urls: Record<string, string>;
}

export default function ChampionGrid({ title, champions, urls }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {/* Título opcional para identificar la caja */}
            <h2 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">
                {title}
            </h2>

            {/* Grid adaptable */}
            <div className="grid grid-cols-3 gap-3">
                {champions.map((champ) => (
                    <ChampionCard
                        key={champ}
                        name={champ}
                        imageUrl={urls[champ]}
                    />
                ))}
            </div>
        </div>
    );
}