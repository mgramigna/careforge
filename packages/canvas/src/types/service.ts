import { type Result } from 'neverthrow';
import { z } from 'zod';

import { BaseBundleSchema, Bundle } from '../models';

interface BaseArgs {
  accessToken: string;
}

interface ReadArgs extends BaseArgs {
  id: string;
}

interface CreateArgs<T> extends BaseArgs {
  resource: Omit<T, 'id'>;
}

interface UpdateArgs<T> extends BaseArgs {
  resource: T;
}

interface SearchArgs<T> extends BaseArgs {
  args: T;
}

export interface Service<TResource, TSearchArgs> {
  read: (args: ReadArgs) => Promise<Result<TResource, string>>;
  create: (args: CreateArgs<TResource>) => Promise<Result<string, string>>;
  update: (args: UpdateArgs<TResource>) => Promise<Result<null, string>>;
  search: (
    args: SearchArgs<TSearchArgs>,
  ) => Promise<Result<z.infer<typeof BaseBundleSchema>, string>>;
}
