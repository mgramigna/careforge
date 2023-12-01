import { type Result } from 'neverthrow';

interface BaseArgs {
  accessToken: string;
}

interface ReadArgs extends BaseArgs {
  id: string;
}

interface CreateArgs<T> extends BaseArgs {
  resource: Omit<T, 'id'>;
}

export interface Service<T> {
  read: (args: ReadArgs) => Promise<Result<T, string>>;
  create: (args: CreateArgs<T>) => Promise<Result<string, string>>;
}
