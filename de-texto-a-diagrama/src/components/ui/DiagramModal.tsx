import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface DiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  diagramCode: string;
  diagramTitle: string;
}

export const DiagramModal: React.FC<DiagramModalProps> = ({
  isOpen,
  onClose,
  onMinimize,
  diagramCode,
  diagramTitle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !diagramCode) return;
    
    const renderDiagram = async () => {
      if (!diagramRef.current) return;
      
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
          svgElement.style.width = '100%';
          svgElement.style.height = 'auto';
          svgElement.style.cursor = 'grab';
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
    setZoom(100);
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
        className="relative bg-white rounded-[20px] shadow-2xl transition-all duration-300"
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
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 bg-white rounded-t-[20px] border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 truncate max-w-[60%]">
            {diagramTitle}
          </h2>
          
          <div className="flex items-center space-x-3">
            {/* Minimize button */}
            <button
              onClick={onMinimize}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Minimizar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            {/* Download button */}
            <button
              onClick={handleDownload}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Descargar SVG"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Diagram Container */}
        <div 
          ref={containerRef}
          className="absolute top-[73px] left-0 right-0 bottom-[80px] overflow-hidden bg-gray-50"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Renderizando diagrama...</p>
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
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 25}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="text-sm text-gray-600 min-w-[50px] text-center">
              {zoom}%
            </span>
            
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 300}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            <button
              onClick={resetView}
              className="p-2 text-gray-500 hover:text-gray-700 rounded transition-colors text-xs"
              title="Reset View"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramModal;