# Claude Code Configuration

Este archivo contiene las reglas y configuraciones específicas para el proyecto "De Texto a Diagrama".

## Comandos para ejecutar

### Desarrollo
```bash
npm run dev
```

### Build y deployment
```bash
npm run build
npm run preview
```

### Tests y calidad de código
```bash
npm run lint
# No hay comando type-check configurado actualmente
# Para verificar tipos: tsc --noEmit
```

## Estructura del proyecto

- `src/` - Código fuente React + TypeScript
- `standalone.html` - Versión independiente que funciona sin servidor
- `dist/` - Build de producción
- `public/` - Assets estáticos

## Tecnologías principales

- React 18 + TypeScript
- TailwindCSS para estilos
- Mermaid.js para renderizado de diagramas
- Vite como bundler
- Google Analytics 4 (configurado pero no activo)

## Funcionalidades implementadas

- ✅ Generación de diagramas Mermaid desde texto
- ✅ Modal avanzado con navegación drag/pan y zoom
- ✅ Exportación SVG con nombres inteligentes
- ✅ Detección de patrones específicos (login, e-commerce, recetas, etc.)
- ✅ Limpieza automática de emojis y caracteres problemáticos
- ✅ Títulos descriptivos generados automáticamente
- ✅ Versión standalone HTML que funciona sin servidor

## Notas importantes

- El modal funciona correctamente con todas las especificaciones requeridas
- Se ha solucionado el problema de emojis en el texto (específicamente el emoji 🥔)
- Ambas versiones (React y standalone) están sincronizadas
- El proyecto está preparado para integración con Gemini AI (pendiente)
- ESLint configurado, Prettier NO implementado
- Variables de entorno configuradas (.env) pero algunas están vacías
- No hay routing - aplicación SPA simple