import { err, ok, type Result } from 'neverthrow';
import { ZodError, type ZodType, type ZodTypeDef } from 'zod';

export async function makeFhirRequest<T>(
  schema: ZodType<T, ZodTypeDef, T>,
  args: {
    path: string;
    token: string;
  },
): Promise<Result<T, string>> {
  try {
    const response = await fetch(args.path, {
      headers: {
        Authorization: `Bearer ${args.token}`,
      },
    });

    return ok(schema.parse(await response.json()));
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
