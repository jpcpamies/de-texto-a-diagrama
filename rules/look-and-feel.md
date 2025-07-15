# Guía de Estilos Visuales - App Crea Diagrama

## Filosofía de Diseño

La aplicación combina la elegancia minimalista de ChatGPT con la sofisticación del modo nocturno, creando una experiencia visual profesional y moderna que prioriza la funcionalidad sin sacrificar la estética.

## Paleta de Colores

### Colores Principales
- **Fondo primario:** `#1a1a1a` - Negro suave para el fondo principal
- **Fondo secundario:** `#2d2d2d` - Gris oscuro para contenedores y tarjetas
- **Fondo terciario:** `#3a3a3a` - Gris medio para elementos elevados

### Colores de Texto
- **Texto primario:** `#ffffff` - Blanco puro para títulos y texto principal
- **Texto secundario:** `#b0b0b0` - Gris claro para texto descriptivo
- **Texto terciario:** `#808080` - Gris medio para texto de apoyo

### Colores de Acento
- **Acento principal:** `#4ecdc4` - Turquesa vibrante para elementos activos
- **Acento secundario:** `#10A37F` - Verde ChatGPT para elementos interactivos
- **Acento hover:** `#3db3ab` - Turquesa más oscuro para estados hover

### Colores de Estado
- **Éxito:** `#4ade80` - Verde claro
- **Advertencia:** `#fbbf24` - Amarillo
- **Error:** `#f87171` - Rojo suave
- **Información:** `#60a5fa` - Azul claro

## Tipografía

### Fuentes Principales
- **Familia:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Fallback:** System fonts humanistas sans-serif

### Jerarquía Tipográfica
- **H1 - Título Principal:** 32px, font-weight: 700, line-height: 1.2
- **H2 - Subtítulos:** 24px, font-weight: 600, line-height: 1.3
- **H3 - Secciones:** 20px, font-weight: 600, line-height: 1.4
- **Texto Principal:** 16px, font-weight: 400, line-height: 1.6
- **Texto Secundario:** 14px, font-weight: 400, line-height: 1.5
- **Texto Pequeño:** 12px, font-weight: 400, line-height: 1.4

### Espaciado Tipográfico
- **Espaciado entre líneas:** Generoso (1.5-1.6 para texto principal)
- **Espaciado entre párrafos:** 16px mínimo
- **Alineación:** Izquierda por defecto, centrado solo para títulos principales

## Espaciado y Layout

### Sistema de Espaciado
- **Unidad base:** 8px
- **Espaciado pequeño:** 8px
- **Espaciado medio:** 16px
- **Espaciado grande:** 24px
- **Espaciado extra grande:** 32px

### Contenedores y Tarjetas
- **Padding interno:** 24px para contenedores principales, 16px para tarjetas secundarias
- **Márgenes:** 16px entre elementos, 24px entre secciones
- **Bordes redondeados:** 8px para contenedores, 12px para tarjetas principales
- **Ancho máximo:** 1200px para contenido principal

## Elementos de Interfaz

### Botones
- **Primario:** Fondo turquesa (`#4ecdc4`), texto blanco, padding 12px 24px
- **Secundario:** Borde turquesa, texto turquesa, fondo transparente
- **Hover:** Transformación sutil (scale: 1.02), transición 200ms
- **Bordes redondeados:** 8px
- **Sombra:** Muy sutil o inexistente

### Campos de Entrada
- **Fondo:** `#2d2d2d` (gris oscuro)
- **Borde:** 1px solid `#404040` (gris medio)
- **Borde focus:** 2px solid `#4ecdc4` (turquesa)
- **Padding:** 12px 16px
- **Bordes redondeados:** 6px

### Tarjetas de Casos de Uso
- **Fondo:** `#2d2d2d` con gradiente sutil
- **Borde:** 1px solid `#404040`
- **Padding:** 20px
- **Bordes redondeados:** 12px
- **Hover:** Elevación sutil con sombra y borde turquesa

## Iconografía

### Características
- **Estilo:** Minimalistas, monocromáticos
- **Grosor:** 1.5px-2px para líneas
- **Tamaño:** 20px para iconos inline, 24px para iconos de navegación
- **Color:** Hereda del texto o usa acento turquesa

### Iconos Principales
- **Documentación:** Documento con líneas
- **Procesos:** Círculos conectados
- **Recetas:** Reloj o cronómetro
- **Generar:** Rayo o varita mágica

## Efectos Visuales

### Sombras
- **Sombra sutil:** `0 2px 8px rgba(0, 0, 0, 0.1)`
- **Sombra elevada:** `0 4px 16px rgba(0, 0, 0, 0.15)`
- **Sombra interna:** `inset 0 1px 2px rgba(0, 0, 0, 0.1)`

### Transiciones
- **Duración estándar:** 200ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)
- **Propiedades:** transform, opacity, border-color, background-color

### Gradientes
- **Gradiente sutil:** `linear-gradient(145deg, #2d2d2d, #252525)`
- **Gradiente acento:** `linear-gradient(145deg, #4ecdc4, #3db3ab)`

## Estados Interactivos

### Hover
- **Elementos clicables:** Transformación sutil (scale: 1.02)
- **Botones:** Cambio de color de fondo más oscuro/claro
- **Tarjetas:** Elevación con sombra y borde de acento

### Focus
- **Outline:** 2px solid turquesa con offset 2px
- **Campos:** Borde turquesa de 2px

### Active
- **Transformación:** scale(0.98) para feedback táctil
- **Duración:** 100ms

## Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Adaptaciones
- **Padding:** Reducir a 16px en mobile
- **Tipografía:** Escalar proporcionalmente
- **Espaciado:** Mantener jerarquía con valores reducidos

## Accesibilidad

### Contraste
- **Texto principal:** Mínimo 4.5:1 ratio
- **Texto secundario:** Mínimo 3:1 ratio
- **Elementos interactivos:** Mínimo 3:1 ratio

### Interacción
- **Área mínima de toque:** 44px × 44px
- **Estados de focus:** Claramente visibles
- **Feedback:** Inmediato y claro

## Implementación

### CSS Custom Properties
```css
:root {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3a3a3a;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --accent-primary: #4ecdc4;
  --accent-secondary: #10A37F;
  --spacing-unit: 8px;
  --border-radius: 8px;
  --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Principios de Aplicación
1. **Consistencia:** Usar siempre los valores definidos
2. **Progresión:** Aplicar cambios graduales, no abruptos
3. **Propósito:** Cada elemento visual debe tener una función clara
4. **Simplicidad:** Priorizar la claridad sobre la decoración