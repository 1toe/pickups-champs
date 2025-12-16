import { StrictMode } from 'react'  // Strict es para ayudar a identificar problemas en la aplicación
import { createRoot } from 'react-dom/client' // CreateRoot es el nuevo método para renderizar en React 18
import './index.css' // Importa los estilos globales
import App from './App.tsx' // Importa el componente principal de la aplicación

// Renderiza la aplicación dentro del elemento con id 'root' en el HTML

// El siguiente bloque:
// - Envuelve la aplicación en StrictMode para activar verificaciones adicionales en desarrollo
// - Utiliza createRoot para crear un contenedor de renderizado y luego renderiza el componente App
// Para editar lo que se muestra en pantalla, modifica el componente "App" en App.tsx
createRoot(document.getElementById('root')!).render( 
  <StrictMode>
    <App /> {/* COMPONENTE principal de la aplicación, modificable en App.tsx */}
  </StrictMode>,
) 
