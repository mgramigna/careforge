import { type Result } from 'neverthrow';

export abstract class Service<T> {
  constructor(public baseUrl: string) {}

  abstract read(
    { id, accessToken }: { id: string; accessToken: string },
  ): Promise<Result<T, string>>;
  abstract create(
    { resource, accessToken }: { resource: T; accessToken: string },
  ): Promise<Result<string, string>>;
}
