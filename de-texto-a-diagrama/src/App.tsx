import { useEffect, useState } from 'react';
import { initializeGA4 } from './analytics/gtag';
import { trackAppLoaded } from './analytics/events';
import { DiagramRenderer } from './components/diagram';
import { DiagramModal } from './components/ui';
import { generateCreativeTitle } from './utils/titleGenerator';
import { enhanceDiagramWithStyles } from './services/diagram';
import { generateDiagram } from './services/gemini';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMermaidCode, setShowMermaidCode] = useState(false);

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
      // Generate with Gemini AI only
      const aiResponse = await generateDiagram({ 
        input: inputText,
        context: 'Generate a clear and logical diagram that represents the described process, system, or concept.'
      });
      
      if (aiResponse.success && aiResponse.data) {
        // AI generation succeeded
        const mermaidCode = aiResponse.data.mermaidCode;
        const diagramType = aiResponse.data.diagramType;
        
        const enhancedCode = mermaidCode; // No processing
        const diagramTitle = generateCreativeTitle(inputText, diagramType);
        
        setAppState(prev => ({
          ...prev,
          isProcessing: false,
          currentDiagram: {
            id: crypto.randomUUID(),
            code: enhancedCode,
            type: diagramType as any,
            title: diagramTitle,
            createdAt: new Date(),
          },
        }));
        
        // Mostrar notificación de éxito
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        
        console.log('✅ Diagram generated with Gemini AI');
        
      } else {
        // AI generation failed - show error instead of fallback
        setAppState(prev => ({
          ...prev,
          isProcessing: false,
          error: `Error al generar diagrama con IA: ${aiResponse.error}`,
        }));
        console.log('❌ AI generation failed:', aiResponse.error);
      }
      
    } catch (error) {
      console.error('❌ Error in diagram generation:', error);
      setAppState(prev => ({
        ...prev,
        isProcessing: false,
        error: 'Error al generar diagrama. Verifica tu conexión a internet y la configuración de la API.',
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

  const handleFullscreen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-secondary shadow-subtle border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-text-primary" style={{fontSize: '32px', lineHeight: '1.2'}}>
                De Texto a Diagrama
              </h1>
            </div>
            <div className="text-sm text-text-secondary">
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
            <div className="card">
              <h2 className="font-semibold text-text-primary mb-6" style={{fontSize: '24px', lineHeight: '1.3'}}>
                Entrada de Datos
              </h2>
              
              {/* Input Type Selector */}
              <div className="mb-4">
                <label className="font-normal text-text-secondary mb-2 block" style={{fontSize: '14px', lineHeight: '1.5'}}>
                  Tipo de entrada:
                </label>
                <div className="flex space-x-2">
                  {(['text', 'voice', 'audio'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputTypeChange(type)}
                      className={`px-3 py-2 rounded-md font-medium transition-all duration-default ${
                        appState.inputType === type
                          ? 'bg-accent-primary text-text-primary'
                          : 'bg-bg-tertiary text-text-secondary hover:bg-accent-primary hover:text-text-primary'
                      }`}
                      style={{fontSize: '14px', lineHeight: '1.5'}}
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
                {/* Clear button - only show when there's text */}
                {inputText.trim() && (
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={handleClearDiagram}
                      className="text-text-secondary hover:text-accent-primary transition-colors flex items-center space-x-1"
                      style={{fontSize: '14px', lineHeight: '1.5'}}
                      title="Limpiar texto"
                    >
                      <i className="fas fa-times text-sm"></i>
                      <span>Limpiar</span>
                    </button>
                  </div>
                )}
                
                {appState.inputType === 'text' && (
                  <textarea
                    className="input-field resize-none h-32"
                    style={{fontSize: '16px', lineHeight: '1.6'}}
                    placeholder="Escribe aquí el texto que quieres convertir en diagrama..."
                    disabled={appState.isProcessing}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                )}
                
                {appState.inputType === 'voice' && (
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <div className="text-text-secondary">
                      <i className="fas fa-microphone text-5xl mb-4"></i>
                      <p>Grabadora de voz</p>
                      <p style={{fontSize: '14px', lineHeight: '1.5'}}>Próximamente...</p>
                    </div>
                  </div>
                )}
                
                {appState.inputType === 'audio' && (
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <div className="text-text-secondary">
                      <i className="fas fa-cloud-upload-alt text-5xl mb-4"></i>
                      <p>Subir archivo de audio</p>
                      <p style={{fontSize: '14px', lineHeight: '1.5'}}>Próximamente...</p>
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
                <div className="mt-4 p-3 bg-red-900/20 border border-red-600 rounded-md">
                  <p className="text-error" style={{fontSize: '14px', lineHeight: '1.5'}}>{appState.error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Diagram Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-semibold text-text-primary mb-6" style={{fontSize: '24px', lineHeight: '1.3'}}>
                Diagrama Generado
              </h2>
              
              {appState.currentDiagram ? (
                <div className="space-y-0">
                  {/* Diagram Display Area */}
                  <div 
                    className="relative cursor-pointer"
                    onClick={handleFullscreen}
                    title="Clic para ampliar en pantalla completa"
                  >
                    <DiagramRenderer 
                      code={appState.currentDiagram.code}
                      className="w-full"
                    />
                  </div>
                  
                  {/* Mermaid Code Section - Collapsible */}
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <button
                      onClick={() => setShowMermaidCode(!showMermaidCode)}
                      className="flex items-center justify-between w-full text-left text-text-secondary hover:text-accent-primary transition-colors"
                      style={{fontSize: '14px', lineHeight: '1.5'}}
                    >
                      <span>Ver código Mermaid</span>
                      <i className={`fas fa-chevron-${showMermaidCode ? 'up' : 'down'} text-xs`}></i>
                    </button>
                    
                    {showMermaidCode && (
                      <div className="mt-3">
                        <pre className="bg-bg-tertiary border border-gray-600 rounded-lg p-3 text-text-secondary overflow-x-auto" style={{fontSize: '12px', lineHeight: '1.4'}}>
                          <code>{appState.currentDiagram.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <div className="text-text-secondary">
                    <i className="fas fa-project-diagram text-5xl mb-4"></i>
                    <p>Aquí aparecerá tu diagrama</p>
                    <p style={{fontSize: '14px', lineHeight: '1.5'}}>Genera un diagrama para visualizarlo</p>
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
          diagramCode={appState.currentDiagram.code}
          diagramTitle={appState.currentDiagram.title}
        />
      )}
      
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-bg-secondary border border-gray-600 rounded-lg shadow-elevated px-6 py-4 flex items-center space-x-3 animate-fade-in">
            <i className="fas fa-check-circle text-success text-xl"></i>
            <span className="text-text-primary font-medium">Diagrama generado exitosamente</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;