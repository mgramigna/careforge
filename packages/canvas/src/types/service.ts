import { type Result } from 'neverthrow';

interface BaseArgs {
  accessToken: string;
}

interface ReadArgs extends BaseArgs {
  id: string;
}

interface CreateArgs<T> extends BaseArgs {
  resource: Partial<T>;
}

interface UpdateArgs<T> extends BaseArgs {
  resource: Partial<T>;
}

interface SearchArgs<T> extends BaseArgs {
  args: T;
}

export interface Service<TResource, TSearchArgs, TSearchOutput, TCreateArgs, TUpdateArgs> {
  read: (args: ReadArgs) => Promise<Result<TResource, string>>;
  create: (args: CreateArgs<TCreateArgs>) => Promise<Result<string, string>>;
  update: (args: UpdateArgs<TUpdateArgs>) => Promise<Result<null, string>>;
  search: (args: SearchArgs<TSearchArgs>) => Promise<Result<TSearchOutput, string>>;
}
