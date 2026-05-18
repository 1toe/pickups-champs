import { useState, useEffect } from "react";
import { SUPPORT_POOL, ADC_POOL } from "./constants/champions";
import ChampionGrid from "./components/ChampionGrid";
import ChampionDetail from "./components/ChampionDetail";
import useChampionAssets from "./hooks/useChampionAssets";
import { getChampionDetail, ultimoParche } from "./api/ddragon";

// Componente principal App para la aplicación de matching de campeones
// Funcionamiento:
// 1. Gestiona el estado global de la aplicación (selecciones, hover, detalles).
// 2. Renderiza condicionalmente entre vista de grids y vista de detalles.
// 3. Maneja interacciones de usuario como hover y clic para matching.
// Si es necesario, revisar: https://react.dev/learn/thinking-in-react
// Palabras claves: componente, estado, useState, conditional rendering, props

function App() {
    // Estado para el campeón seleccionado
    const [selectedSupport, setSelectedSupport] = useState<string | null>(null);
    const [selectedADC, setSelectedADC] = useState<string | null>(null);

    // Estado para hover
    const [hoveredADC, setHoveredADC] = useState<string | null>(null);

    // Estado para vista de detalles
    const [showDetails, setShowDetails] = useState(false);
    const [detailChamp1, setDetailChamp1] = useState<any>(null);
    const [detailChamp2, setDetailChamp2] = useState<any>(null);
    const [version, setVersion] = useState<string>("");

    // Obtenemos las URLs
    const urls = useChampionAssets();

    useEffect(() => {
        // Función para obtener la versión del juego
        // Funcionamiento:
        // 1. Llama a ultimoParche para fetch de la versión.
        // 2. Actualiza el estado version con el resultado.
        // Palabras claves: useEffect, async, fetch, setState
        async function fetchVersion() {
            const v = await ultimoParche();
            setVersion(v);
        }
        fetchVersion();
    }, []);

    // Listas planas
    const supportList = SUPPORT_POOL.flat();
    const adcList = ADC_POOL.flat();

    // Sinergias: ADC -> Supports compatibles
    const synergies: Record<string, string[]> = {
        "Jhin": ["Karma", "Nami"],
        "Ashe": ["Braum", "Milio", "Seraphine"], // Nota: Ashe no está en ADC_POOL, pero incluido
        "Lucian": ["Nami", "Seraphine"], // Nota: Lucian no está en ADC_POOL
        "Ezreal": ["Karma", "Nami"],
        "Caitlyn": ["Lux", "Karma", "Nami"]
    };

    // Función para encontrar ADC compatible con un Support
    // Funcionamiento:
    // 1. Itera sobre las sinergias para encontrar supports que incluyan el parámetro.
    // 2. Si encuentra, retorna un ADC aleatorio de la lista compatible.
    // 3. Si no, retorna un ADC aleatorio de adcList.
    // Palabras claves: function, for...of, includes, Math.random, array
    const findCompatibleADC = (support: string): string => {
        for (const [adc, supports] of Object.entries(synergies)) {
            if (supports.includes(support) && adcList.includes(adc)) {
                return adc;
            }
        }
        // Si no hay sinergia específica, elegir aleatorio
        return adcList[Math.floor(Math.random() * adcList.length)];
    };

    // Función para encontrar Support compatible con un ADC
    // Funcionamiento:
    // 1. Busca el ADC en synergies para obtener supports compatibles.
    // 2. Si existen, retorna uno aleatorio.
    // 3. Si no, retorna un support aleatorio de supportList.
    // Palabras claves: function, synergies, Math.random, array
    const findCompatibleSupport = (adc: string): string => {
        const supports = synergies[adc];
        if (supports && supports.length > 0) {
            return supports[Math.floor(Math.random() * supports.length)];
        }
        // Si no hay sinergia específica, elegir aleatorio
        return supportList[Math.floor(Math.random() * supportList.length)];
    };

    // Función para manejar hover en Support
    // Funcionamiento:
    // 1. Si support no es null, encuentra ADC compatible y lo setea como hovered.
    // 2. Si es null, resetea hoveredADC.
    // Palabras claves: function, conditional, setState
    const handleSupportHover = (support: string | null) => {
        if (support) {
            const compatibleADC = findCompatibleADC(support);
            setHoveredADC(compatibleADC);
        } else {
            setHoveredADC(null);
        }
    };

    // Función para seleccionar un ADC basado en el Support
    // Funcionamiento:
    // 1. Setea selectedSupport con el parámetro.
    // 2. Encuentra ADC compatible y lo setea como selectedADC.
    // Palabras claves: function, setState, compatible
    const selectADCForSupport = (support: string) => {
        setSelectedSupport(support);
        const compatibleADC = findCompatibleADC(support);
        setSelectedADC(compatibleADC);
    };

    // Función para abrir detalles de Support y ADC compatible
    // Funcionamiento:
    // 1. Llama a selectADCForSupport para mantener selección.
    // 2. Fetch detalles de ambos campeones usando getChampionDetail.
    // 3. Setea los detalles y cambia a vista de detalles.
    // Palabras claves: async, await, fetch, setState, details
    const openDetailsForSupport = async (support: string) => {
        selectADCForSupport(support); // Mantener selección
        const adc = selectedADC!;
        const supportDetail = await getChampionDetail(support);
        const adcDetail = await getChampionDetail(adc);
        setDetailChamp1(supportDetail);
        setDetailChamp2(adcDetail);
        setShowDetails(true);
    };

    // Función para abrir detalles de ADC y Support compatible
    // Funcionamiento:
    // 1. Encuentra support compatible y setea selecciones.
    // 2. Fetch detalles de ambos campeones.
    // 3. Setea detalles y cambia vista.
    // Palabras claves: async, await, fetch, setState, compatible
    const openDetailsForADC = async (adc: string) => {
        const support = findCompatibleSupport(adc);
        setSelectedADC(adc);
        setSelectedSupport(support);
        const supportDetail = await getChampionDetail(support);
        const adcDetail = await getChampionDetail(adc);
        setDetailChamp1(supportDetail);
        setDetailChamp2(adcDetail);
        setShowDetails(true);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-blue-400">
                Matching de PickUps
            </h1>

            {showDetails && detailChamp1 && detailChamp2 && version ? (
                <div className="mb-8">
                    <button
                        onClick={() => setShowDetails(false)}
                        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Volver
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ChampionDetail champion={detailChamp1} version={version} />
                        <ChampionDetail champion={detailChamp2} version={version} />
                    </div>
                </div>
            ) : (
                <>
                    {/* Mostrar selección si hay */}
                    {selectedSupport && selectedADC && (
                        <div className="mb-8 p-4 bg-slate-800 rounded-lg">
                            <h2 className="text-xl font-semibold">Selección Actual</h2>
                            <p>Support: {selectedSupport} - ADC: {selectedADC}</p>
                        </div>
                    )}

                    {/* CONTENEDOR PRINCIPAL: Grid de 2 columnas */}
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* IZQUIERDA: Supports */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-2xl">
                            <ChampionGrid
                                title="Pool de Supports"
                                champions={supportList}
                                urls={urls}
                                onSelect={openDetailsForSupport}
                                onHover={handleSupportHover}
                                selected={selectedSupport}
                            />
                        </div>

                        {/* DERECHA: ADCs */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-2xl">
                            <ChampionGrid
                                title="Pool de ADCs"
                                champions={adcList}
                                urls={urls}
                                onSelect={openDetailsForADC}
                                selected={selectedADC}
                                hovered={hoveredADC}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;