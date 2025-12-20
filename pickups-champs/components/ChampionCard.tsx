// components/ChampionCard.tsx

interface ChampionCardProps {
    name: string;
    imageUrl: string;
}

export default function ChampionCard({ name, imageUrl }: ChampionCardProps) {
    return (
        <div className="
            aspect-square 
            rounded-lg 
            bg-gradient-to-br from-blue-900 to-slate-800 
            border border-slate-700 
            hover:border-blue-500 
            cursor-pointer 
            flex flex-col items-center justify-center 
            p-2 
            transition-all 
            group" /* Investigar - Grouping!!! */
        >
            <img
                src={imageUrl}
                alt={name}
                className="w-24 h-24 rounded-md mb-2 object-cover shadow-md"
            />
            <p className="text-xs font-semibold text-slate-300 group-hover:text-blue-300 text-center">
                {name}
            </p>
        </div>
    );
}