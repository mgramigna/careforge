export type CanvasErrorType =
  | 'PARSE'
  | 'BAD_REQUEST'
  | 'UNKNOWN'
  | 'UNSUPPORTED'
  | 'INTERNAL'
  | 'NOT_FOUND';

export interface CanvasError {
  errorType: CanvasErrorType;
  details?: string;
}
