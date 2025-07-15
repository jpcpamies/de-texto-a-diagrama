// Validation utilities
export const validateText = (text: string): boolean => {
  return text.trim().length > 0;
};

export const validateMermaidCode = (code: string): boolean => {
  // Basic validation for Mermaid syntax
  const mermaidKeywords = [
    'graph', 'flowchart', 'sequenceDiagram', 'classDiagram',
    'erDiagram', 'journey', 'gantt', 'pie', 'gitgraph'
  ];
  
  return mermaidKeywords.some(keyword => code.includes(keyword));
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};