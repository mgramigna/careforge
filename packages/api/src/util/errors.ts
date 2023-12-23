import { TRPCError } from '@trpc/server';
import { match } from 'ts-pattern';

import { type CanvasError } from '@careforge/canvas';

export function handleApiError(error: CanvasError): TRPCError {
  return match(error)
    .with(
      { errorType: 'PARSE' },
      ({ details }) =>
        new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: details,
        }),
    )
    .with(
      { errorType: 'NOT_FOUND' },
      ({ details }) =>
        new TRPCError({
          code: 'NOT_FOUND',
          message: details,
        }),
    )
    .with(
      { errorType: 'BAD_REQUEST' },
      ({ details }) =>
        new TRPCError({
          code: 'BAD_REQUEST',
          message: details,
        }),
    )
    .otherwise(
      (e) =>
        new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: e.details,
        }),
    );
}
