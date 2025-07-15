# 📋 Plan de Desarrollo MVP "De Texto a Diagrama"

## 🎯 Objetivo del Proyecto
Crear una aplicación web que transforme texto, voz o audio en diagramas visuales Mermaid usando IA (Gemini 2.5 Flash).

## 🏗️ Arquitectura Técnica

### Stack Principal
- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Diagrama**: Mermaid.js + d3.js (para renderizado)
- **Backend**: Node.js + Express (API REST)
- **IA**: Gemini 2.5 Flash API
- **Audio**: Web Speech API + MediaRecorder API
- **Analytics**: Google Analytics 4 (GA4)
- **Despliegue**: Vercel (frontend) + Railway/Render (backend)

## 📋 Fases de Desarrollo

### 🚀 Fase 1: Core MVP (Semana 1-2)

#### Setup y Configuración Base
- [x] Crear proyecto React con TypeScript y Vite
- [x] Configurar TailwindCSS
- [x] Setup estructura de carpetas
- [ ] Configurar ESLint y Prettier
- [x] Configurar variables de entorno
- [x] Configurar Google Analytics 4
- [x] Crear componente App.tsx principal
- [ ] Configurar routing básico (si necesario)

#### Interfaz Básica
- [x] Crear layout responsive principal
- [x] Implementar componente InputSelector
- [x] Crear componente TextInput básico
- [x] Implementar StatusBar para estados
- [x] Crear componente DiagramRenderer básico
- [x] Añadir botón "Generar diagrama"
- [x] Implementar states de loading/error

#### Integración IA
- [ ] Configurar servicio Gemini 2.5 Flash
- [ ] Crear API endpoint `/api/generate-diagram`
- [ ] Implementar prompt optimizer
- [ ] Crear validador de código Mermaid
- [ ] Conectar frontend con backend
- [ ] Manejar errores de API

#### Renderizado Mermaid
- [ ] Configurar Mermaid.js en React
- [ ] Implementar renderizado básico
- [ ] Manejar diferentes tipos de diagrama
- [ ] Implementar refresh de diagrama
- [ ] Añadir loading states

#### Analytics Básico
- [x] Implementar hook useAnalytics
- [x] Trackear pageview
- [x] Trackear diagram_generated
- [x] Trackear errores básicos
- [x] Configurar eventos personalizados

### 🎵 Fase 2: Funcionalidades Audio (Semana 3)

#### Grabación de Voz
- [ ] Implementar componente VoiceRecorder
- [ ] Configurar MediaRecorder API
- [ ] Añadir controles grabación (start/stop/pause)
- [ ] Implementar visualización de audio
- [ ] Manejar permisos de micrófono
- [ ] Añadir límites de tiempo grabación

#### Transcripción
- [ ] Configurar Web Speech API
- [ ] Implementar transcripción en tiempo real
- [ ] Crear fallback para transcripción
- [ ] Manejar diferentes idiomas
- [ ] Implementar corrección de errores
- [ ] Añadir confianza de transcripción

#### Upload de Audio
- [ ] Crear componente AudioUploader
- [ ] Implementar drag & drop
- [ ] Validar formatos de audio
- [ ] Implementar límites de tamaño
- [ ] Crear preview de archivo
- [ ] Procesar archivos localmente

#### Analytics Audio
- [ ] Trackear voice_recording_started
- [ ] Trackear voice_recording_completed
- [ ] Trackear audio_file_uploaded
- [ ] Trackear transcription_completed
- [ ] Trackear errores de audio
- [ ] Métricas de duración grabación

### 🔧 Fase 3: Herramientas Visualización (Semana 4)

#### Controles de Visualización
- [ ] Implementar componente DiagramControls
- [ ] Añadir zoom in/out
- [ ] Implementar pan del diagrama
- [ ] Crear modo pantalla completa
- [ ] Configurar fondo blanco para export
- [ ] Añadir reset de vista

#### Exportación
- [ ] Implementar exportación SVG
- [ ] Crear utilidad svg-exporter
- [ ] Añadir exportación PNG
- [ ] Implementar descarga directa
- [ ] Optimizar calidad export
- [ ] Añadir metadatos al export

#### Funcionalidades Extra
- [ ] Implementar botón limpiar/reiniciar
- [ ] Añadir historial de diagramas
- [ ] Crear shortcuts de teclado
- [ ] Implementar tooltips
- [ ] Añadir modo oscuro/claro
- [ ] Optimizar performance

#### Analytics Visualización
- [ ] Trackear zoom_used
- [ ] Trackear fullscreen_toggled
- [ ] Trackear svg_exported
- [ ] Trackear diagram_cleared
- [ ] Trackear uso de shortcuts
- [ ] Métricas de interacción

### 🎨 Fase 4: Pulido y Deploy (Semana 5)

#### Optimización UI/UX
- [ ] Refinar responsive design
- [ ] Optimizar animaciones
- [ ] Mejorar feedback visual
- [ ] Implementar mejor manejo errores
- [ ] Añadir loading skeletons
- [ ] Optimizar accesibilidad

#### Performance
- [ ] Implementar code splitting
- [ ] Optimizar bundle size
- [ ] Añadir lazy loading
- [ ] Implementar caching
- [ ] Optimizar renderizado Mermaid
- [ ] Configurar Service Worker

#### Testing
- [ ] Configurar Jest + React Testing Library
- [ ] Tests unitarios componentes
- [ ] Tests integración API
- [ ] Configurar Cypress
- [ ] Tests e2e flujos principales
- [ ] Tests analytics (mocked)

#### Deployment
- [ ] Configurar build de producción
- [ ] Setup Vercel para frontend
- [ ] Setup Railway/Render para backend
- [ ] Configurar variables entorno
- [ ] Implementar CI/CD
- [ ] Configurar monitoreo

## 🧩 Componentes Desarrollar

### Frontend Components
- [ ] `App.tsx` - Componente principal
- [ ] `InputSelector.tsx` - Selector tipo input
- [ ] `TextInput.tsx` - Input de texto
- [ ] `VoiceRecorder.tsx` - Grabadora de voz
- [ ] `AudioUploader.tsx` - Subida archivos
- [ ] `StatusBar.tsx` - Barra estado
- [ ] `DiagramRenderer.tsx` - Renderizado Mermaid
- [ ] `DiagramControls.tsx` - Controles diagrama
- [ ] `analytics/gtag.tsx` - Config Google Analytics
- [ ] `hooks/useAnalytics.tsx` - Hook tracking

### Backend Endpoints
- [ ] `api/generate-diagram` - Análisis con Gemini
- [ ] `api/transcribe` - Transcripción audio
- [ ] `api/health` - Health check
- [ ] `middlewares/validation.js` - Validación
- [ ] `middlewares/rateLimit.js` - Rate limiting
- [ ] `services/gemini.js` - Servicio IA

### Utilities
- [ ] `prompt-optimizer.js` - Optimización prompts
- [ ] `mermaid-validator.js` - Validación Mermaid
- [ ] `svg-exporter.js` - Exportación SVG
- [ ] `analytics/events.js` - Definición eventos
- [ ] `utils/audio.js` - Utilidades audio
- [ ] `utils/storage.js` - Storage local

## 📊 Eventos Analytics a Trackear

### Eventos Principales
- [ ] `page_view` - Visitas app
- [ ] `diagram_generated` - Diagrama generado
- [ ] `input_type_selected` - Tipo input seleccionado
- [ ] `voice_recording_started` - Inicio grabación
- [ ] `voice_recording_completed` - Fin grabación
- [ ] `audio_file_uploaded` - Archivo subido
- [ ] `transcription_completed` - Transcripción ok
- [ ] `svg_exported` - Export SVG
- [ ] `zoom_used` - Uso zoom
- [ ] `fullscreen_toggled` - Pantalla completa
- [ ] `diagram_cleared` - Diagrama limpiado
- [ ] `error_occurred` - Errores categorizados

### Métricas Personalizadas
- [ ] Tiempo promedio generación
- [ ] Tipo input más usado
- [ ] Tasa éxito transcripción
- [ ] Tamaño promedio diagramas

## 🧪 Testing Strategy

### Unit Tests
- [ ] Componentes React individuales
- [ ] Utilidades y helpers
- [ ] Servicios API
- [ ] Hooks personalizados
- [ ] Validadores y parsers

### Integration Tests
- [ ] Flujo completo texto → diagrama
- [ ] Flujo voz → transcripción → diagrama
- [ ] Upload audio → transcripción → diagrama
- [ ] Exportación SVG
- [ ] Analytics events (mocked)

### E2E Tests
- [ ] Usuario genera diagrama con texto
- [ ] Usuario graba voz y genera diagrama
- [ ] Usuario sube audio y genera diagrama
- [ ] Usuario exporta SVG
- [ ] Manejo de errores

## 🚀 Deployment Checklist

### Pre-Deploy
- [ ] Tests pasando
- [ ] Build sin errores
- [ ] Variables entorno configuradas
- [ ] Analytics configurado
- [ ] Performance optimizada

### Deploy Frontend (Vercel)
- [ ] Conectar repositorio
- [ ] Configurar build commands
- [ ] Configurar variables entorno
- [ ] Configurar dominio
- [ ] Configurar redirects

### Deploy Backend (Railway/Render)
- [ ] Configurar Dockerfile
- [ ] Configurar variables entorno
- [ ] Configurar health checks
- [ ] Configurar logs
- [ ] Configurar scaling

### Post-Deploy
- [ ] Verificar funcionalidad
- [ ] Verificar analytics
- [ ] Configurar alertas
- [ ] Documentar deploy
- [ ] Configurar backups

## 📈 Métricas de Éxito MVP

### Performance
- [ ] Tiempo respuesta < 3s
- [ ] Soporte diagramas hasta 50 nodos
- [ ] Responsive desde 320px
- [ ] Compatibilidad navegadores modernos

### Analytics
- [ ] Tracking 95%+ eventos críticos
- [ ] Dashboard analytics operativo
- [ ] Métricas tiempo real
- [ ] Reportes semanales

### User Experience
- [ ] Flujo completo sin errores
- [ ] Interfaz intuitiva
- [ ] Feedback visual claro
- [ ] Manejo errores elegante

---

## 🏃‍♂️ Próximos Pasos

1. **Comenzar con Fase 1** - Setup proyecto y configuración base
2. **Implementar core MVP** - Funcionalidad básica texto → diagrama
3. **Añadir analytics** - Tracking eventos básicos
4. **Continuar con Fase 2** - Funcionalidades audio
5. **Completar todas las fases** - Hasta deployment

---

*Actualizado: 2025-07-15*