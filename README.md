# Matching de PickUps - League of Legends

Una aplicación web para emparejar campeones Support y ADC en League of Legends, facilitando la selección de picks en partidas de pickups.

## Descripción

Esta aplicación permite a los usuarios explorar pools de campeones Support y ADC, y ver combinaciones sugeridas mediante hover y selección. Al hacer hover sobre un Support, se resalta un ADC compatible (actualmente aleatorio, preparado para sinergias específicas). Al hacer clic, se selecciona permanentemente la combinación.

## Características

- **Pools de Campeones**: Utiliza únicamente los campeones definidos en `SUPPORT_POOL` y `ADC_POOL`.
- **Interfaz Interactiva**:
  - Hover sobre Support: Resalta un ADC sugerido en tiempo real.
  - Clic en Support: Selecciona permanentemente la combinación.
- **Layout Responsivo**: Dos columnas (Supports izquierda, ADCs derecha) que se adaptan a móviles y desktop.
- **Resaltado Visual**: Bordes y fondos verdes para campeones seleccionados o en hover.
- **API de Data Dragon**: Obtiene iconos de campeones desde la API oficial de Riot Games.

## Pools de Campeones

### Supports
- **Grupo 1**: Janna, Lulu, Milio, Nami, Rell, Seraphine
- **Grupo 2**: Braum, Karma, Lux, Morgana, Neeko, Rakan
- **Grupo 3**: Senna, Sona, Taric

### ADCs
- **Grupo 1**: Aphelios, Caitlyn, Ezreal, Jhin, Kaisa, MissFortune
- **Grupo 2**: Samira, Tristana, Vayne, Xayah, Zeri

## Tecnologías Utilizadas

- **Frontend**: React 19 con TypeScript
- **Estilos**: Tailwind CSS
- **Build Tool**: Vite
- **API**: Data Dragon (Riot Games)
- **Estado**: useState de React

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/1toe/pickups-champs.git
   cd pickups-champs
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Uso

- **Hover**: Pasa el mouse sobre un campeón Support para ver un ADC sugerido resaltado.
- **Selección**: Haz clic en un Support para fijar la selección y mostrarla arriba.
- **Responsive**: La app se adapta a diferentes tamaños de pantalla.

## Estructura del Proyecto

```
pickups-champs/
├── public/
├── src/
│   ├── api/
│   │   └── ddragon.ts          # Funciones para obtener datos de Data Dragon
│   ├── components/
│   │   ├── ChampionCard.tsx    # Componente para cada campeón
│   │   ├── ChampionGrid.tsx    # Grid de campeones con título
│   │   └── App.tsx             # Componente principal
│   ├── constants/
│   │   └── champions.ts        # Pools de Supports y ADCs
│   ├── hooks/
│   │   └── useChampionAssets.ts # Hook para cargar URLs de iconos
│   ├── index.css               # Estilos globales
│   └── main.tsx                # Punto de entrada
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Componentes Principales

### App.tsx
- Gestiona el estado de selección y hover.
- Renderiza las dos grids de campeones.

### ChampionGrid.tsx
- Muestra una lista de campeones en grid.
- Maneja eventos de clic y hover.

### ChampionCard.tsx
- Representa un campeón individual con imagen y nombre.
- Responde a hover y clic.

### useChampionAssets.ts
- Hook que obtiene las URLs de iconos de campeones desde Data Dragon.

## API Utilizada

- **Data Dragon**: Para obtener versiones de parches e iconos de campeones.
  - Endpoint: `https://ddragon.leagueoflegends.com/api/versions.json`
  - Iconos: `https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{champ}.png`

## Próximas Funcionalidades

- Implementar sinergias específicas entre Supports y ADCs en lugar de selección aleatoria.
- Agregar más detalles de campeones (estadísticas, habilidades).
- Persistencia de selecciones.
- Modo oscuro adicional o temas.

## Contribución

1. Fork el proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## Autor

- **1toe** - Desarrollador principal.

---

¡Disfruta emparejando tus picks en League of Legends!