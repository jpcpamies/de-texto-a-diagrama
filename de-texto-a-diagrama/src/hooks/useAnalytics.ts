import { useCallback } from 'react';
import * as analytics from '../analytics/events';
import type { InputType } from '../types';

export const useAnalytics = () => {
  const trackInputTypeSelected = useCallback((inputType: InputType) => {
    analytics.trackInputTypeSelected(inputType);
  }, []);

  const trackTextInputUsed = useCallback((textLength: number) => {
    analytics.trackTextInputUsed(textLength);
  }, []);

  const trackVoiceRecordingStarted = useCallback(() => {
    analytics.trackVoiceRecordingStarted();
  }, []);

  const trackVoiceRecordingCompleted = useCallback((duration: number) => {
    analytics.trackVoiceRecordingCompleted(duration);
  }, []);

  const trackVoiceRecordingError = useCallback((error: string) => {
    analytics.trackVoiceRecordingError(error);
  }, []);

  const trackAudioFileUploaded = useCallback((fileSize: number, duration?: number) => {
    analytics.trackAudioFileUploaded(fileSize, duration);
  }, []);

  const trackTranscriptionStarted = useCallback((inputType: 'voice' | 'audio') => {
    analytics.trackTranscriptionStarted(inputType);
  }, []);

  const trackTranscriptionCompleted = useCallback((
    inputType: 'voice' | 'audio',
    textLength: number,
    confidence?: number
  ) => {
    analytics.trackTranscriptionCompleted(inputType, textLength, confidence);
  }, []);

  const trackTranscriptionError = useCallback((
    inputType: 'voice' | 'audio',
    error: string
  ) => {
    analytics.trackTranscriptionError(inputType, error);
  }, []);

  const trackDiagramGenerationStarted = useCallback((inputType: InputType, textLength: number) => {
    analytics.trackDiagramGenerationStarted(inputType, textLength);
  }, []);

  const trackDiagramGenerated = useCallback((
    inputType: InputType,
    diagramType: string,
    processingTime: number,
    confidence?: number
  ) => {
    analytics.trackDiagramGenerated(inputType, diagramType, processingTime, confidence);
  }, []);

  const trackDiagramGenerationError = useCallback((
    inputType: InputType,
    error: string,
    processingTime: number
  ) => {
    analytics.trackDiagramGenerationError(inputType, error, processingTime);
  }, []);

  const trackZoomUsed = useCallback((zoomLevel: number, action: 'in' | 'out' | 'reset') => {
    analytics.trackZoomUsed(zoomLevel, action);
  }, []);

  const trackFullscreenToggled = useCallback((enabled: boolean) => {
    analytics.trackFullscreenToggled(enabled);
  }, []);

  const trackDiagramCleared = useCallback(() => {
    analytics.trackDiagramCleared();
  }, []);

  const trackSvgExported = useCallback((diagramType: string) => {
    analytics.trackSvgExported(diagramType);
  }, []);

  const trackPngExported = useCallback((diagramType: string) => {
    analytics.trackPngExported(diagramType);
  }, []);

  const trackError = useCallback((
    errorType: string,
    errorMessage: string,
    context?: Record<string, any>
  ) => {
    analytics.trackError(errorType, errorMessage, context);
  }, []);

  const trackPerformance = useCallback((
    metricName: string,
    value: number,
    unit: 'ms' | 'bytes' | 'count' = 'ms'
  ) => {
    analytics.trackPerformance(metricName, value, unit);
  }, []);

  return {
    trackInputTypeSelected,
    trackTextInputUsed,
    trackVoiceRecordingStarted,
    trackVoiceRecordingCompleted,
    trackVoiceRecordingError,
    trackAudioFileUploaded,
    trackTranscriptionStarted,
    trackTranscriptionCompleted,
    trackTranscriptionError,
    trackDiagramGenerationStarted,
    trackDiagramGenerated,
    trackDiagramGenerationError,
    trackZoomUsed,
    trackFullscreenToggled,
    trackDiagramCleared,
    trackSvgExported,
    trackPngExported,
    trackError,
    trackPerformance,
  };
};