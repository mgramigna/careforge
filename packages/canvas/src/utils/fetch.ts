import { err, ok, type Result } from 'neverthrow';
import { ZodError, type ZodType, type ZodTypeDef } from 'zod';

export async function makeFhirGetRequest<T>(
  schema: ZodType<T, ZodTypeDef, T>,
  args: {
    path: string;
    token: string;
    query?: string;
  },
): Promise<Result<T, string>> {
  const queryString = args.query ? `?${args.query}` : '';

  try {
    const response = await fetch(`${args.path}${queryString}`, {
      headers: {
        Authorization: `Bearer ${args.token}`,
      },
      method: 'GET',
    });

    return ok(schema.parse(await response.json()));
  } catch (e) {
    // TODO: fill these in
    if (e instanceof ZodError) {
      return err('parse');
    }

    if (e instanceof Error) {
      return err('bad');
    }

    return err('bad');
  }
}

export async function makeFhirCreateRequest<T>(args: {
  path: string;
  token: string;
  body?: T;
}): Promise<Result<string, string>> {
  try {
    const response = await fetch(args.path, {
      headers: {
        Authorization: `Bearer ${args.token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(args.body),
    });

    const location = response.headers.get('location');

    if (!location) {
      return err('todo');
    }

    const locationWithoutHistory = location.replace(/\/_history.*/, '');
    const id = locationWithoutHistory.substring(locationWithoutHistory.lastIndexOf('/') + 1);

    return ok(id);
  } catch (e) {
    // TODO: fill these in
    if (e instanceof ZodError) {
      return err('bad');
    }

    if (e instanceof Error) {
      return err('bad');
    }

    return err('bad');
  }
}

export async function makeFhirUpdateRequest<T>(args: {
  path: string;
  token: string;
  body?: T;
}): Promise<Result<null, string>> {
  try {
    await fetch(args.path, {
      headers: {
        Authorization: `Bearer ${args.token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(args.body),
    });

    return ok(null);
  } catch (e) {
    // TODO: fill these in
    if (e instanceof ZodError) {
      return err('bad');
    }

    if (e instanceof Error) {
      return err('bad');
    }

    return err('bad');
  }
}
