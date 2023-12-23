import { err, ok, type Result } from 'neverthrow';
import { ZodError, type ZodType, type ZodTypeDef } from 'zod';

import { type CanvasError } from '../types/errors';

export async function makeFhirGetRequest<T>(
  schema: ZodType<T, ZodTypeDef, T>,
  args: {
    path: string;
    token: string;
    query?: string;
  },
): Promise<Result<T, CanvasError>> {
  const queryString = args.query ? `?${args.query}` : '';

  try {
    console.log(`[canvas] GET ${args.path}${queryString}`);
    const response = await fetch(`${args.path}${queryString}`, {
      headers: {
        Authorization: `Bearer ${args.token}`,
      },
      method: 'GET',
    });

    console.log(`[canvas] ${response.status}`);

    if (!response.ok) {
      console.log(`[canvas] ERROR: ${await response.text()}`);
    }

    return ok(schema.parse(await response.json()));
  } catch (e) {
    if (e instanceof ZodError) {
      return err({
        errorType: 'PARSE',
        details: e.message,
      });
    }

    if (e instanceof Error) {
      return err({
        errorType: 'UNKNOWN',
        details: e.message,
      });
    }

    return err({
      errorType: 'UNKNOWN',
    });
  }
}

export async function makeFhirCreateRequest<T>(args: {
  path: string;
  token: string;
  body?: T;
}): Promise<Result<string, CanvasError>> {
  try {
    console.log(`[canvas] POST ${args.path}`);
    const response = await fetch(args.path, {
      headers: {
        Authorization: `Bearer ${args.token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(args.body),
    });

    console.log(`[canvas] ${response.status}`);

    if (!response.ok) {
      console.log(`[canvas] ERROR: ${await response.text()}`);
    }

    const location = response.headers.get('location');

    if (!location) {
      return err({
        errorType: 'INTERNAL',
        details: 'Could not parse location from response headers',
      });
    }

    const locationWithoutHistory = location.replace(/\/_history.*/, '');
    const id = locationWithoutHistory.substring(locationWithoutHistory.lastIndexOf('/') + 1);

    return ok(id);
  } catch (e) {
    if (e instanceof ZodError) {
      return err({
        errorType: 'PARSE',
        details: e.message,
      });
    }

    if (e instanceof Error) {
      return err({
        errorType: 'UNKNOWN',
        details: e.message,
      });
    }

    return err({
      errorType: 'UNKNOWN',
    });
  }
}

export async function makeFhirUpdateRequest<T>(args: {
  path: string;
  token: string;
  body?: T;
}): Promise<Result<null, CanvasError>> {
  try {
    console.log(`[canvas] PUT ${args.path}`);
    const response = await fetch(args.path, {
      headers: {
        Authorization: `Bearer ${args.token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(args.body),
    });

    console.log(`[canvas] ${response.status}`);

    if (!response.ok) {
      console.log(`[canvas] ERROR: ${await response.text()}`);
    }

    return ok(null);
  } catch (e) {
    if (e instanceof ZodError) {
      return err({
        errorType: 'PARSE',
        details: e.message,
      });
    }

    if (e instanceof Error) {
      return err({
        errorType: 'UNKNOWN',
        details: e.message,
      });
    }

    return err({
      errorType: 'UNKNOWN',
    });
  }
}
