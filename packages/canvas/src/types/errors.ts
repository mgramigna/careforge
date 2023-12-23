export type CanvasErrorType = 'PARSE' | 'BAD_REQUEST' | 'UNKNOWN' | 'UNSUPPORTED' | 'INTERNAL';

export interface CanvasError {
  errorType: CanvasErrorType;
  details?: string;
}
