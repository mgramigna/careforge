import { err } from 'neverthrow';

import {
  SlotBundleSchema,
  SlotSearchArgsSchema,
  type Slot,
  type SlotBundle,
  type SlotSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type SlotServiceType = Service<Slot, SlotSearchArgs, SlotBundle, never, never>;

export const SlotService = ({ baseUrl }: { baseUrl: string }): SlotServiceType => {
  const read: SlotServiceType['read'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const create: SlotServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: SlotServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: SlotServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = SlotSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(SlotBundleSchema, {
      path: `${baseUrl}/Slot`,
      token: accessToken,
      query: new URLSearchParams(parsedArgs as Record<string, string>).toString(),
    });

    return response;
  };

  return {
    read,
    create,
    update,
    search,
  };
};
