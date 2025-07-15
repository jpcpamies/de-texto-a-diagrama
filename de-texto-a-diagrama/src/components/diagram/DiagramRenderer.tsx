import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface DiagramRendererProps {
  code: string;
  className?: string;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  code,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [diagramId] = useState(`diagram-${Date.now()}`);

  useEffect(() => {
    // Configurar Mermaid con el tema personalizado de alta calidad
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 14,
      darkMode: false,
      themeVariables: {
        primaryColor: '#4ecdc4',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#3db3ab',
        lineColor: '#4ecdc4',
        secondaryColor: '#2d2d2d',
        tertiaryColor: '#3a3a3a',
        background: '#2d2d2d',
        mainBkg: '#2d2d2d',
        secondBkg: '#3a3a3a',
        nodeBkg: '#2d2d2d',
        nodeBorder: '#4ecdc4',
        clusterBkg: '#3a3a3a',
        clusterBorder: '#4ecdc4',
        defaultLinkColor: '#4ecdc4',
        titleColor: '#ffffff',
        edgeLabelBackground: '#2d2d2d',
        actorBorder: '#4ecdc4',
        actorBkg: '#2d2d2d',
        actorTextColor: '#ffffff',
        actorLineColor: '#4ecdc4',
        signalColor: '#ffffff',
        signalTextColor: '#ffffff',
        labelBoxBkgColor: '#2d2d2d',
        labelBoxBorderColor: '#4ecdc4',
        labelTextColor: '#ffffff',
        loopTextColor: '#ffffff',
        noteBorderColor: '#4ecdc4',
        noteBkgColor: '#2d2d2d',
        noteTextColor: '#ffffff',
        activationBorderColor: '#4ecdc4',
        activationBkgColor: '#3a3a3a',
        sequenceNumberColor: '#ffffff',
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
    });
  }, []);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    const renderDiagram = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Limpiar contenedor anterior
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Validar sintaxis de Mermaid
        const isValid = await mermaid.parse(code);
        if (!isValid) {
          throw new Error('Código Mermaid inválido');
        }

        // Renderizar diagrama
        const { svg } = await mermaid.render(diagramId, code);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          
          // Mejorar el styling del SVG
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.background = 'transparent';
          }
        }
      } catch (err) {
        console.error('Error rendering diagram:', err);
        
        // Proporcionar mensajes de error más específicos
        let errorMessage = 'Error desconocido al renderizar';
        if (err instanceof Error) {
          if (err.message.includes('syntax')) {
            errorMessage = 'Error de sintaxis en el código Mermaid. Verifica que el texto no contenga caracteres especiales problemáticos.';
          } else if (err.message.includes('parse')) {
            errorMessage = 'No se pudo procesar el texto proporcionado. Intenta con un texto más simple.';
          } else {
            errorMessage = err.message;
          }
        }
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [code, diagramId]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center text-text-secondary">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-2"></div>
          <p>Renderizando diagrama...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center text-error p-4">
          <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="font-medium">Error al renderizar</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`overflow-auto bg-bg-secondary border border-gray-600 rounded-lg p-4 ${className}`}
      style={{ minHeight: '16rem' }}
    />
  );
};

export default DiagramRenderer;