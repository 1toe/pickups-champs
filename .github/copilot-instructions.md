# Copilot Instructions for pickups-champs

## Project Overview
React + TypeScript app for League of Legends champion matchmaking. Matches Support and ADC champions with interactive hover/click UI showing detailed stats in Spanish.

## Architecture
- **App.tsx**: Main orchestrator with state management (selectedSupport, selectedADC, showDetails). Handles champion selection and detail view toggling.
- **ChampionGrid.tsx**: Renders grid of ChampionCard components. Props: title, champions array, urls object, onSelect/onHover callbacks.
- **ChampionCard.tsx**: Individual champion display with image, name, hover/click handlers. Uses conditional classes for highlighting.
- **ChampionDetail.tsx**: Detailed champion view with stats, abilities, and accessibility features. Fetches data from Data Dragon API.
- **API Layer**: `ddragon.ts` - Fetches champion data and icons from Riot's Data Dragon. Uses Spanish locale for details.
- **Constants**: `champions.ts` - Defines SUPPORT_POOL and ADC_POOL as nested arrays of champion names.

## Key Workflows
- **Development**: `npm run dev` starts Vite dev server with HMR
- **Build**: `npm run build` runs TypeScript compilation (`tsc -b`) then Vite production build
- **Debugging**: Check browser console for API fetch errors. Champion data loads asynchronously on detail view.

## Conventions & Patterns
- **Indentation**: 2 spaces consistently across all files
- **Styling**: Tailwind CSS classes directly in JSX. Use `className` with conditional logic (e.g., `selected === champ ? 'border-green-500' : ''`)
- **State Management**: Local useState hooks. No global state library - pass props down for communication
- **Async Handling**: `async/await` for API calls. Error handling via try/catch in fetch functions
- **Component Props**: Strongly typed interfaces (e.g., `ChampionDetailProps`). Use `any` for API responses when structure varies
- **File Structure**: Flat components/ directory. API in api/, constants in constants/, hooks in hooks/
- **Naming**: PascalCase for components, camelCase for functions/variables. Spanish comments and UI text

## Integration Points
- **Data Dragon API**: Champion details in Spanish (`/data/es_ES/champion/{name}.json`). Icons via `/img/champion/{name}.png`
- **Version Handling**: `ultimoParche()` fetches latest patch version for API URLs
- **Responsive Design**: Tailwind breakpoints (`md:`) for mobile/desktop layouts
- **Accessibility**: ARIA labels, semantic HTML, high contrast colors (green/blue/purple/red for stats)

## Examples
- **Conditional Rendering**: `{showDetails ? <DetailView /> : <GridView />}`
- **API Fetch**: `const data = await fetch(\`https://ddragon.leagueoflegends.com/cdn/${version}/data/es_ES/champion/${name}.json\`); return data.data[name];`
- **State Update**: `setSelectedSupport(support); setSelectedADC(findCompatibleADC(support));`
- **Grid Layout**: `<div className="grid grid-cols-3 gap-3">` for champion cards

## Common Pitfalls
- Champion names must match Data Dragon exactly (case-sensitive)
- API responses use nested structure: `data.data[championName]`
- State updates are synchronous - use callbacks for dependent updates
- Tailwind classes override each other; order matters in conditional expressions