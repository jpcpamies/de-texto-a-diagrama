import { useState } from 'react';

interface DiagramControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onFullscreen: () => void;
  onExportSVG: () => void;
  onClear: () => void;
  isFullscreen?: boolean;
}

export const DiagramControls: React.FC<DiagramControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onFullscreen,
  onExportSVG,
  onClear,
  isFullscreen = false
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 25, 200);
    setZoomLevel(newZoom);
    onZoomIn();
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 25, 25);
    setZoomLevel(newZoom);
    onZoomOut();
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
    onZoomReset();
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
      {/* Controles de Zoom */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 25}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom Out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="text-sm text-gray-600 min-w-12 text-center">
          {zoomLevel}%
        </span>
        
        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 200}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom In"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        <button
          onClick={handleZoomReset}
          className="btn-secondary text-xs px-2"
          title="Reset Zoom"
        >
          Reset
        </button>
        
        <div className="w-px h-4 bg-gray-300 mx-2"></div>
        
        <button
          onClick={onFullscreen}
          className="btn-secondary"
          title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        >
          {isFullscreen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>
      </div>

      {/* Controles de Acción */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onExportSVG}
          className="btn-primary text-xs px-3 py-1"
          title="Exportar como SVG"
        >
          <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar SVG
        </button>
        
        <button
          onClick={onClear}
          className="btn-secondary text-xs px-3 py-1"
          title="Limpiar diagrama"
        >
          <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default DiagramControls;