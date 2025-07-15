// Diagram processing service

export const exportDiagramAsSVG = async (diagramCode: string): Promise<string> => {
  try {
    // TODO: Implement SVG export using Mermaid
    // For now, return mock SVG
    return `<svg><!-- Mock SVG for: ${diagramCode} --></svg>`;
  } catch (error) {
    throw new Error('Failed to export diagram as SVG');
  }
};

export const exportDiagramAsPNG = async (_diagramCode: string): Promise<Blob> => {
  try {
    // TODO: Implement PNG export using Mermaid
    // For now, return mock blob
    return new Blob(['mock png data'], { type: 'image/png' });
  } catch (error) {
    throw new Error('Failed to export diagram as PNG');
  }
};

export const validateDiagramCode = (code: string): boolean => {
  // Basic validation for Mermaid syntax
  const mermaidKeywords = [
    'graph', 'flowchart', 'sequenceDiagram', 'classDiagram',
    'erDiagram', 'journey', 'gantt', 'pie', 'gitgraph'
  ];
  
  return mermaidKeywords.some(keyword => code.includes(keyword));
};

export const optimizeDiagramCode = (code: string): string => {
  // Basic optimization - remove extra whitespace
  return code.trim().replace(/\s+/g, ' ');
};

// Estilos de nodos por categorías basados en el diagrama de referencia
const nodeStyles = {
  process: 'fill:#e0f2fe,stroke:#0284c7,stroke-width:2px',
  input: 'fill:#e0f2fe,stroke:#0284c7,stroke-width:2px',
  ai: 'fill:#ddd6fe,stroke:#7c3aed,stroke-width:2px',
  generation: 'fill:#f0fdf4,stroke:#16a34a,stroke-width:2px',
  decision: 'fill:#fff7ed,stroke:#ea580c,stroke-width:2px',
  action: 'fill:#fef3c7,stroke:#d97706,stroke-width:2px',
  storage: 'fill:#ecfdf5,stroke:#059669,stroke-width:2px',
  management: 'fill:#fef7cd,stroke:#ca8a04,stroke-width:2px',
  search: 'fill:#e0f2fe,stroke:#0284c7,stroke-width:2px'
};

export const enhanceDiagramWithStyles = (code: string): string => {
  // Detectar si el código ya tiene configuración de tema
  if (code.includes('config:') || code.includes('theme:')) {
    return code;
  }

  // Agregar configuración de tema al inicio del diagrama
  const themeConfig = `---
config:
  theme: base
  themeVariables:
    primaryColor: '#f0f9ff'
    primaryTextColor: '#1f2937'
    primaryBorderColor: '#6b7280'
    lineColor: '#000000'
    secondaryColor: '#f0f9ff'
    tertiaryColor: '#f0f9ff'
    background: '#ffffff'
    mainBkg: '#ffffff'
    secondBkg: '#ffffff'
  layout: dagre
---
`;

  // Detectar el tipo de diagrama y aplicar estilos automáticamente
  let enhancedCode = code;
  
  if (code.includes('flowchart') || code.includes('graph')) {
    // Aplicar estilos automáticos basados en palabras clave
    const lines = code.split('\n');
    const styleLines: string[] = [];
    
    lines.forEach(line => {
      const match = line.match(/(\w+)\[/);
      if (match) {
        const nodeId = match[1];
        const text = line.toLowerCase();
        
        let style = nodeStyles.action; // default
        
        if (text.includes('inicio') || text.includes('start')) {
          style = nodeStyles.process;
        } else if (text.includes('grabar') || text.includes('input') || text.includes('entrada')) {
          style = nodeStyles.input;
        } else if (text.includes('transcribir') || text.includes('ai') || text.includes('modelo')) {
          style = nodeStyles.ai;
        } else if (text.includes('generar') || text.includes('crear') || text.includes('procesar')) {
          style = nodeStyles.generation;
        } else if (text.includes('seleccionar') || text.includes('elegir') || text.includes('¿')) {
          style = nodeStyles.decision;
        } else if (text.includes('guardar') || text.includes('base de datos') || text.includes('almacenar')) {
          style = nodeStyles.storage;
        } else if (text.includes('gestión') || text.includes('administrar') || text.includes('configurar')) {
          style = nodeStyles.management;
        } else if (text.includes('buscar') || text.includes('consultar') || text.includes('búsqueda')) {
          style = nodeStyles.search;
        }
        
        styleLines.push(`    style ${nodeId} ${style}`);
      }
    });
    
    if (styleLines.length > 0) {
      enhancedCode += '\n' + styleLines.join('\n');
    }
  }
  
  return themeConfig + enhancedCode;
};