export interface DiagramData {
  id: string;
  code: string;
  type: 'flowchart' | 'sequence' | 'classDiagram' | 'erDiagram' | 'journey' | 'gantt' | 'pie' | 'gitgraph';
  title: string;
  createdAt: Date;
}

export interface InputData {
  text?: string;
  audioBlob?: Blob;
  audioFile?: File;
}

export interface TranscriptionResult {
  text: string;
  confidence: number;
  language: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerateDiagramRequest {
  input: string;
  context?: string;
}

export interface GenerateDiagramResponse {
  mermaidCode: string;
  diagramType: DiagramData['type'];
  confidence: number;
}

export type InputType = 'text' | 'voice' | 'audio';

export interface AppState {
  currentInput: InputData;
  inputType: InputType;
  isProcessing: boolean;
  currentDiagram: DiagramData | null;
  error: string | null;
}