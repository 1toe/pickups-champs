import ChampionGrid from './components/ChampionGrid'
import userChampionAssets from './hooks/useChampionAssets'

function App() {
  const urls = userChampionAssets() // Esto obtiene las URLs de los assets de los campeones
  // Estas vienen de un hook personalizado que maneja la lógica de fetch y estado
  // Exactamente son de los supports definidos en constants/champions.ts
  // y se obtienen usando la API de Community Dragon en api/commdragon.ts

  return (
    <>
      <ChampionGrid urls={urls} />
    </>
  )
}

export default App
