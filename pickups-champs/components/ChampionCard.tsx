// Interfaz para las props del componente ChampionCard
// Funcionamiento:
// 1. Define las propiedades requeridas y opcionales para el componente.
// 2. Incluye name, imageUrl, callbacks opcionales y flag de resaltado.
// Si es necesario, revisar: https://www.typescriptlang.org/docs/handbook/interfaces.html
// Palabras claves: interface, props, TypeScript, opcional, callbacks

interface ChampionCardProps {
    name: string;
    imageUrl: string;
    onClick?: () => void;
    onHoverEnter?: () => void;
    onHoverLeave?: () => void;
    isHighlighted?: boolean;
}

// Componente ChampionCard para mostrar un campeón individual
// Funcionamiento:
// 1. Renderiza un div con clases Tailwind condicionales para estilo y hover.
// 2. Incluye una imagen del campeón y su nombre.
// 3. Maneja eventos onClick, onMouseEnter, onMouseLeave si se proporcionan.
// 4. Aplica resaltado visual si isHighlighted es true.
// Si es necesario, revisar: https://tailwindcss.com/docs/conditional-classes
// Palabras claves: componente, JSX, Tailwind, conditional, events, props

export default function ChampionCard({ name, imageUrl, onClick, onHoverEnter, onHoverLeave, isHighlighted }: ChampionCardProps) {
    return (
        <div
            className={`
                aspect-square 
                rounded-lg 
                bg-gradient-to-br from-blue-900 to-slate-800 
                border border-slate-700 
                hover:border-blue-500 
                cursor-pointer 
                flex flex-col items-center justify-center 
                p-2 
                transition-all 
                group
                ${isHighlighted ? 'border-green-500 bg-green-900' : ''}
            `}
            onClick={onClick}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
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