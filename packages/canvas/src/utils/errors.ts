import { err, type Err } from 'neverthrow';
import { match } from 'ts-pattern';

import { type CanvasError } from '../types/errors';

export async function getCanvasErrorFromResponse(
  response: Response,
): Promise<Err<never, CanvasError>> {
  const responseText = await response.text();

  console.log(`[canvas] ERROR: ${responseText}`);

  return match(response.status)
    .returnType<Err<never, CanvasError>>()
    .with(400, () => err({ errorType: 'BAD_REQUEST' as const, details: responseText }))
    .with(404, () => err({ errorType: 'NOT_FOUND' as const, details: responseText }))
    .with(500, () => err({ errorType: 'INTERNAL' as const, details: responseText }))
    .otherwise(() =>
      err({
        errorType: 'UNKNOWN' as const,
        details: responseText,
      }),
    );
}
