// Audio utilities
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
    audio.addEventListener('error', reject);
    audio.src = URL.createObjectURL(file);
  });
};

export const validateAudioFile = (file: File): boolean => {
  const validTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm'];
  return validTypes.includes(file.type);
};

export const convertBlobToFile = (blob: Blob, filename: string): File => {
  return new File([blob], filename, { type: blob.type });
};