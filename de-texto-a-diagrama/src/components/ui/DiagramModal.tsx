import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface DiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramCode: string;
  diagramTitle: string;
}

export const DiagramModal: React.FC<DiagramModalProps> = ({
  isOpen,
  onClose,
  diagramCode,
  diagramTitle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(75);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !diagramCode) return;
    
    const renderDiagram = async () => {
      if (!diagramRef.current || !containerRef.current) return;
      
      setIsLoading(true);
      try {
        diagramRef.current.innerHTML = '';
        const diagramId = `modal-diagram-${Date.now()}`;
        const { svg } = await mermaid.render(diagramId, diagramCode);
        diagramRef.current.innerHTML = svg;
        
        const svgElement = diagramRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = 'none';
          svgElement.style.maxHeight = 'none';
          svgElement.style.width = 'auto';
          svgElement.style.height = 'auto';
          svgElement.style.cursor = 'grab';
          
          // Calcular zoom óptimo para que se ajuste al contenedor
          setTimeout(() => {
            const containerRect = containerRef.current?.getBoundingClientRect();
            const svgRect = svgElement.getBoundingClientRect();
            
            if (containerRect && svgRect) {
              // Usar márgenes más generosos (70% del espacio disponible)
              const availableWidth = containerRect.width * 0.7;
              const availableHeight = containerRect.height * 0.7;
              
              // Calcular ratios
              const widthRatio = availableWidth / svgRect.width;
              const heightRatio = availableHeight / svgRect.height;
              
              // Usar el ratio menor para que quepa completo
              const optimalZoom = Math.min(widthRatio, heightRatio) * 100;
              
              // Establecer zoom óptimo (mínimo 25%, máximo 90%)
              setZoom(Math.min(Math.max(optimalZoom, 25), 90));
              setPosition({ x: 0, y: 0 }); // Centrar
            }
          }, 200);
        }
      } catch (error) {
        console.error('Error rendering modal diagram:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<p class="text-red-500 text-center">Error al renderizar el diagrama</p>';
        }
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [isOpen, diagramCode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === diagramRef.current || diagramRef.current?.contains(e.target as Node)) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      
      const svgElement = diagramRef.current?.querySelector('svg');
      if (svgElement) {
        svgElement.style.cursor = 'grabbing';
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const svgElement = diagramRef.current?.querySelector('svg');
    if (svgElement) {
      svgElement.style.cursor = 'grab';
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -10 : 10; // Scroll down = zoom out, scroll up = zoom in
    setZoom(prev => Math.min(Math.max(prev + delta, 25), 300));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleDownload = () => {
    const svgElement = diagramRef.current?.querySelector('svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `${diagramTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  const resetView = () => {
    // Recalcular zoom óptimo
    const svgElement = diagramRef.current?.querySelector('svg');
    if (svgElement && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const svgRect = svgElement.getBoundingClientRect();
      
      if (containerRect && svgRect) {
        // Obtener dimensiones reales del SVG
        const realSvgWidth = svgRect.width / (zoom / 100);
        const realSvgHeight = svgRect.height / (zoom / 100);
        
        const availableWidth = containerRect.width * 0.7;
        const availableHeight = containerRect.height * 0.7;
        
        const widthRatio = availableWidth / realSvgWidth;
        const heightRatio = availableHeight / realSvgHeight;
        const optimalZoom = Math.min(widthRatio, heightRatio) * 100;
        
        setZoom(Math.min(Math.max(optimalZoom, 25), 90));
      }
    } else {
      setZoom(60);
    }
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-bg-secondary rounded-[20px] shadow-2xl transition-all duration-300 overflow-hidden border border-gray-600"
        style={{
          margin: '20px',
          width: 'calc(100vw - 40px)',
          height: 'calc(100vh - 40px)',
          maxWidth: 'calc(100vw - 40px)',
          maxHeight: 'calc(100vh - 40px)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-6 pb-4 bg-bg-secondary rounded-t-[20px] border-b border-gray-600">
          <h2 className="text-xl font-semibold text-text-primary truncate max-w-[70%]">
            {diagramTitle}
          </h2>
          
          <div className="flex items-center space-x-2">
            {/* Download button */}
            <button
              onClick={handleDownload}
              className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-bg-tertiary rounded-full transition-all duration-200"
              title="Descargar SVG"
            >
              <i className="fas fa-download text-lg font-semibold"></i>
            </button>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-bg-tertiary rounded-full transition-all duration-200"
              title="Cerrar"
            >
              <i className="fas fa-times text-lg font-semibold"></i>
            </button>
          </div>
        </div>

        {/* Diagram Container */}
        <div 
          ref={containerRef}
          className="absolute top-[70px] left-0 right-0 bottom-[80px] overflow-hidden bg-bg-primary rounded-b-[20px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
                <p className="text-text-secondary">Renderizando diagrama...</p>
              </div>
            </div>
          ) : (
            <div 
              ref={diagramRef}
              className="w-full h-full flex items-center justify-center transition-transform duration-200"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100})`,
                transformOrigin: 'center center'
              }}
            />
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 right-0 p-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 25}
              className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-bg-tertiary rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Zoom Out"
            >
              <i className="fas fa-minus text-lg font-semibold"></i>
            </button>
            
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 300}
              className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-bg-tertiary rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Zoom In"
            >
              <i className="fas fa-plus text-lg font-semibold"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramModal;