import { trackEvent } from './gtag';
import type { InputType } from '../types';

// App Events
export const trackAppLoaded = () => {
  trackEvent('app_loaded', {
    timestamp: Date.now(),
  });
};

// Input Events
export const trackInputTypeSelected = (inputType: InputType) => {
  trackEvent('input_type_selected', {
    input_type: inputType,
  });
};

export const trackTextInputUsed = (textLength: number) => {
  trackEvent('text_input_used', {
    text_length: textLength,
  });
};

// Voice Recording Events
export const trackVoiceRecordingStarted = () => {
  trackEvent('voice_recording_started');
};

export const trackVoiceRecordingCompleted = (duration: number) => {
  trackEvent('voice_recording_completed', {
    duration_seconds: Math.round(duration / 1000),
  });
};

export const trackVoiceRecordingError = (error: string) => {
  trackEvent('voice_recording_error', {
    error_message: error,
  });
};

// Audio Upload Events
export const trackAudioFileUploaded = (fileSize: number, duration?: number) => {
  const eventData: { file_size_kb: number; duration_seconds?: number } = {
    file_size_kb: Math.round(fileSize / 1024),
  };
  
  if (duration !== undefined) {
    eventData.duration_seconds = Math.round(duration);
  }
  
  trackEvent('audio_file_uploaded', eventData);
};

// Transcription Events
export const trackTranscriptionStarted = (inputType: 'voice' | 'audio') => {
  trackEvent('transcription_started', {
    input_type: inputType,
  });
};

export const trackTranscriptionCompleted = (
  inputType: 'voice' | 'audio',
  textLength: number,
  confidence?: number
) => {
  const eventData: { input_type: string; text_length: number; confidence?: number } = {
    input_type: inputType,
    text_length: textLength,
  };
  
  if (confidence !== undefined) {
    eventData.confidence = confidence;
  }
  
  trackEvent('transcription_completed', eventData);
};

export const trackTranscriptionError = (
  inputType: 'voice' | 'audio',
  error: string
) => {
  trackEvent('transcription_error', {
    input_type: inputType,
    error_message: error,
  });
};

// Diagram Generation Events
export const trackDiagramGenerationStarted = (inputType: InputType, textLength: number) => {
  trackEvent('diagram_generation_started', {
    input_type: inputType,
    text_length: textLength,
  });
};

export const trackDiagramGenerated = (
  inputType: InputType,
  diagramType: string,
  processingTime: number,
  confidence?: number
) => {
  const eventData: { input_type: string; diagram_type: string; processing_time_ms: number; confidence?: number } = {
    input_type: inputType,
    diagram_type: diagramType,
    processing_time_ms: processingTime,
  };
  
  if (confidence !== undefined) {
    eventData.confidence = confidence;
  }
  
  trackEvent('diagram_generated', eventData);
};

export const trackDiagramGenerationError = (
  inputType: InputType,
  error: string,
  processingTime: number
) => {
  trackEvent('diagram_generation_error', {
    input_type: inputType,
    error_message: error,
    processing_time_ms: processingTime,
  });
};

// Diagram Interaction Events
export const trackZoomUsed = (zoomLevel: number, action: 'in' | 'out' | 'reset') => {
  trackEvent('zoom_used', {
    zoom_level: zoomLevel,
    zoom_action: action,
  });
};

export const trackFullscreenToggled = (enabled: boolean) => {
  trackEvent('fullscreen_toggled', {
    enabled: enabled,
  });
};

export const trackDiagramCleared = () => {
  trackEvent('diagram_cleared');
};

// Export Events
export const trackSvgExported = (diagramType: string) => {
  trackEvent('svg_exported', {
    diagram_type: diagramType,
  });
};

export const trackPngExported = (diagramType: string) => {
  trackEvent('png_exported', {
    diagram_type: diagramType,
  });
};

// Error Events
export const trackError = (
  errorType: string,
  errorMessage: string,
  context?: Record<string, any>
) => {
  trackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    ...context,
  });
};

// Performance Events
export const trackPerformance = (
  metricName: string,
  value: number,
  unit: 'ms' | 'bytes' | 'count' = 'ms'
) => {
  trackEvent('performance_metric', {
    metric_name: metricName,
    value: value,
    unit: unit,
  });
};