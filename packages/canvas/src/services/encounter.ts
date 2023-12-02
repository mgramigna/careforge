import { err } from 'neverthrow';

import {
  EncounterBundleSchema,
  EncounterSchema,
  EncounterSearchArgsSchema,
  type Encounter,
  type EncounterBundle,
  type EncounterSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type EncounterServiceType = Service<
  Encounter,
  EncounterSearchArgs,
  EncounterBundle,
  never,
  never
>;

export const EncounterService = ({ baseUrl }: { baseUrl: string }): EncounterServiceType => {
  const read: EncounterServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(EncounterSchema, {
      path: `${baseUrl}/Encounter/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: EncounterServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: EncounterServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: EncounterServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = EncounterSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(EncounterBundleSchema, {
      path: `${baseUrl}/Encounter`,
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
