import { useEffect, useState } from 'react';
import { initializeGA4 } from './analytics/gtag';
import { trackAppLoaded } from './analytics/events';
import { DiagramRenderer, DiagramControls } from './components/diagram';
import { DiagramModal } from './components/ui';
import { generateCreativeTitle } from './utils/titleGenerator';
import type { InputType, AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentInput: {},
    inputType: 'text',
    isProcessing: false,
    currentDiagram: null,
    error: null,
  });

  const [inputText, setInputText] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics
    initializeGA4();
    
    // Track app loaded
    trackAppLoaded();
  }, []);

  const handleInputTypeChange = (inputType: InputType) => {
    setAppState(prev => ({
      ...prev,
      inputType,
      error: null,
    }));
  };

  const cleanTextForMermaid = (text: string): string => {
    // Remover emojis que causan problemas de sintaxis
    let cleanText = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    
    // Limpiar caracteres especiales problemáticos
    cleanText = cleanText.replace(/[^\w\sáéíóúñÁÉÍÓÚÑ.,():-]/g, ' ');
    
    // Normalizar espacios múltiples
    cleanText = cleanText.replace(/\s+/g, ' ').trim();
    
    return cleanText;
  };

  const generateMermaidCode = (text: string): string => {
    const cleanText = cleanTextForMermaid(text);
    const lowerText = cleanText.toLowerCase();
    
    // Detectar recetas de cocina
    if (lowerText.includes('tortilla') || lowerText.includes('receta') || lowerText.includes('cocinar') || 
        lowerText.includes('ingredientes') || lowerText.includes('patatas') || lowerText.includes('cocina')) {
      return `graph TD
    A[Preparar ingredientes] --> B[Calentar aceite en sarten]
    B --> C[Freir patatas]
    C --> D[Batir huevos]
    D --> E[Mezclar patatas con huevos]
    E --> F[Cuajar tortilla por un lado]
    F --> G[Dar la vuelta]
    G --> H[Cuajar por el otro lado]
    H --> I[Servir caliente]`;
    }
    
    // Detectar tipo de diagrama basado en el contenido
    if (lowerText.includes('login') || lowerText.includes('autenticar') || lowerText.includes('usuario')) {
      return `graph TD
    A[Usuario ingresa credenciales] --> B{Validar usuario}
    B -->|Válido| C[Acceso concedido]
    B -->|Inválido| D[Mostrar error]
    D --> A
    C --> E[Dashboard principal]`;
    }
    
    if (lowerText.includes('proceso') || lowerText.includes('flujo') || lowerText.includes('workflow')) {
      return `graph LR
    A[Inicio] --> B[Recopilar datos]
    B --> C[Procesar información]
    C --> D{¿Es válido?}
    D -->|Sí| E[Guardar resultado]
    D -->|No| F[Reportar error]
    E --> G[Fin]
    F --> G`;
    }
    
    if (lowerText.includes('compra') || lowerText.includes('tienda') || lowerText.includes('carrito')) {
      return `graph TD
    A[Explorar productos] --> B[Añadir al carrito]
    B --> C[Ver carrito]
    C --> D[Proceder al pago]
    D --> E[Introducir datos de pago]
    E --> F[Confirmar pedido]
    F --> G[Pedido completado]`;
    }
    
    if (lowerText.includes('clase') || lowerText.includes('objeto') || lowerText.includes('herencia')) {
      return `classDiagram
    class Usuario {
        +String nombre
        +String email
        +login()
        +logout()
    }
    class Administrador {
        +String permisos
        +gestionarUsuarios()
    }
    Usuario <|-- Administrador`;
    }
    
    // Extraer conceptos principales de manera más robusta
    const words = cleanText.split(/\s+/).filter(word => 
      word.length > 3 && 
      !['para', 'pero', 'este', 'esta', 'solo', 'cada', 'todo', 'todos', 'todas'].includes(word.toLowerCase())
    );
    const mainConcepts = words.slice(0, 4).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    
    if (mainConcepts.length >= 2) {
      return `graph TD
    A[${mainConcepts[0] || 'Inicio'}] --> B[${mainConcepts[1] || 'Proceso'}]
    B --> C[${mainConcepts[2] || 'Análisis'}]
    C --> D[${mainConcepts[3] || 'Resultado'}]`;
    }
    
    return `graph TD
    A[Inicio] --> B[Proceso]
    B --> C[Resultado]
    C --> D[Fin]`;
  };

  const handleGenerateDiagram = async () => {
    if (!inputText.trim()) {
      setAppState(prev => ({ ...prev, error: 'Por favor, introduce algún texto' }));
      return;
    }

    setAppState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
    }));

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mermaidCode = generateMermaidCode(inputText);
      const diagramType = mermaidCode.startsWith('classDiagram') ? 'classDiagram' : 'flowchart';
      const diagramTitle = generateCreativeTitle(inputText, diagramType);
      
      setAppState(prev => ({
        ...prev,
        isProcessing: false,
        currentDiagram: {
          id: crypto.randomUUID(),
          code: mermaidCode,
          type: diagramType as any,
          title: diagramTitle,
          createdAt: new Date(),
        },
      }));
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  };

  const handleClearDiagram = () => {
    setAppState(prev => ({
      ...prev,
      currentDiagram: null,
      currentInput: {},
      error: null,
    }));
    setInputText('');
  };

  // Funciones para controles del diagrama
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const handleFullscreen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMinimizeModal = () => {
    setIsModalOpen(false);
  };

  const handleExportSVG = () => {
    if (!appState.currentDiagram) return;
    
    // Buscar el SVG generado por Mermaid
    const svgElement = document.querySelector('.mermaid svg') || document.querySelector('svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `diagrama-${appState.currentDiagram.id}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                De Texto a Diagrama
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Powered by AI
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Entrada de Datos
              </h2>
              
              {/* Input Type Selector */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tipo de entrada:
                </label>
                <div className="flex space-x-2">
                  {(['text', 'voice', 'audio'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputTypeChange(type)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        appState.inputType === type
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {type === 'text' && 'Texto'}
                      {type === 'voice' && 'Voz'}
                      {type === 'audio' && 'Audio'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="mb-4">
                {appState.inputType === 'text' && (
                  <textarea
                    className="input-field resize-none h-32"
                    placeholder="Escribe aquí el texto que quieres convertir en diagrama..."
                    disabled={appState.isProcessing}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                )}
                
                {appState.inputType === 'voice' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-500">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      <p>Grabadora de voz</p>
                      <p className="text-sm">Próximamente...</p>
                    </div>
                  </div>
                )}
                
                {appState.inputType === 'audio' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-500">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p>Subir archivo de audio</p>
                      <p className="text-sm">Próximamente...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateDiagram}
                  disabled={appState.isProcessing || !inputText.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                >
                  {appState.isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generando...
                    </div>
                  ) : (
                    'Generar Diagrama'
                  )}
                </button>
                
                {appState.currentDiagram && (
                  <button
                    onClick={handleClearDiagram}
                    className="btn-secondary"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Error Display */}
              {appState.error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{appState.error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Diagram Section */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Diagrama Generado
              </h2>
              
              {appState.currentDiagram ? (
                <div className="space-y-0">
                  {/* Diagram Display Area */}
                  <div 
                    className="relative cursor-pointer"
                    style={{ 
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'top left',
                      transition: 'transform 0.2s ease'
                    }}
                    onClick={handleFullscreen}
                    title="Clic para ampliar en pantalla completa"
                  >
                    <DiagramRenderer 
                      code={appState.currentDiagram.code}
                      className="w-full"
                    />
                  </div>
                  
                  {/* Diagram Controls */}
                  <DiagramControls
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onZoomReset={handleZoomReset}
                    onFullscreen={handleFullscreen}
                    onExportSVG={handleExportSVG}
                    onClear={handleClearDiagram}
                    isFullscreen={false}
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                    <p>Aquí aparecerá tu diagrama</p>
                    <p className="text-sm">Genera un diagrama para visualizarlo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal para diagrama expandido */}
      {appState.currentDiagram && (
        <DiagramModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onMinimize={handleMinimizeModal}
          diagramCode={appState.currentDiagram.code}
          diagramTitle={appState.currentDiagram.title}
        />
      )}
    </div>
  );
}

export default App;