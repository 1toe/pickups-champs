// Importa el pool de campeones SUPPORT_POOL desde el archivo de constantes
import { SUPPORT_POOL } from "../constants/champions";

// Define la interfaz Props, que describe las propiedades que el componente espera recibir
// - urls: Un objeto donde las claves son nombres de campeones y los valores son URLs de imágenes
interface Props {
    urls: Record<string, string>;
}

// Define el componente funcional ChampionGrid
// Este componente recibe un objeto "urls" como propiedad y renderiza una cuadrícula de campeones
export default function ChampionGrid({ urls }: Props) {
    return (
        <div className="grid grid-cols-3 gap-3">
            {/* Itera sobre SUPPORT_POOL, que es un array de arrays de campeones */}
            {SUPPORT_POOL.map((row, rowIndex) => (
                <div
                    key={rowIndex} // Usa el índice de la fila como clave única para React
                    className="aspect-square rounded-lg bg-gradient-to-br from-blue-900 to-slate-800 border border-slate-700 hover:border-blue-500 cursor-pointer flex items-center justify-center text-xs font-semibold text-center p-1 text-slate-300 hover:text-blue-300 transition-all"
                >
                    {/* Itera sobre cada campeón en la fila */}
                    {row.map(champ => (
                        <div key={champ}> {/* Usa el nombre del campeón como clave única */}
                            <img
                                src={urls[champ]} // Obtiene la URL de la imagen del campeón desde el objeto "urls"
                                alt={champ} // Usa el nombre del campeón como texto alternativo para la imagen
                                style={{ width: "100px", borderRadius: "8px" }} // Estilo en línea para la imagen
                            />
                            <p style={{ textAlign: "center" }}>{champ}</p> {/* Muestra el nombre del campeón debajo de la imagen */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
