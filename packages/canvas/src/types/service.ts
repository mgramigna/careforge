import { type Result } from 'neverthrow';

import { type CanvasError } from './errors';

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
  read: (args: ReadArgs) => Promise<Result<TResource, CanvasError>>;
  create: (args: CreateArgs<TCreateArgs>) => Promise<Result<string, CanvasError>>;
  update: (args: UpdateArgs<TUpdateArgs>) => Promise<Result<null, CanvasError>>;
  search: (args: SearchArgs<TSearchArgs>) => Promise<Result<TSearchOutput, CanvasError>>;
}
