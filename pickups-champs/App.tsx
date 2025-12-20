import { SUPPORT_POOL, ADC_POOL } from "./constants/champions";
import ChampionGrid from "./components/ChampionGrid";
import useChampionAssets from "./hooks/useChampionAssets";

function App() {
  // 1. Obtenemos las URLs (ahora traerá las de Support Y las de ADC gracias al cambio anterior)
  const urls = useChampionAssets();

  // 2. Preparamos las listas planas
  const supportList = SUPPORT_POOL.flat();
  const adcList = ADC_POOL.flat();

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 flex flex-col items-center">

      <h1 className="text-3xl font-bold mb-8 text-blue-400">
        Matching de PickUps
      </h1>

      {/* CONTENEDOR PRINCIPAL: Grid de 2 columnas */}
      {/* En móvil (por defecto) es 1 columna, en PC (md) son 2 */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* IZQUIERDA: Supports */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-2xl">
          <ChampionGrid
            title="Tabacalter Pool"
            champions={supportList}
            urls={urls}
          />
        </div>

        {/* DERECHA: ADCs / Rivales */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-2xl">
          <ChampionGrid
            title="Gapete Pool"
            champions={adcList}
            urls={urls}
          />
        </div>

      </div>
    </div>
  );
}

export default App;