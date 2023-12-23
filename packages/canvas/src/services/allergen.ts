import { err } from 'neverthrow';

import {
  AllergenBundleSchema,
  AllergenSchema,
  AllergenSearchArgsSchema,
  type Allergen,
  type AllergenBundle,
  type AllergenSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type AllergenServiceType = Service<
  Allergen,
  AllergenSearchArgs,
  AllergenBundle,
  never,
  never
>;

export const AllergenService = ({ baseUrl }: { baseUrl: string }): AllergenServiceType => {
  const read: AllergenServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(AllergenSchema, {
      path: `${baseUrl}/Allergen/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: AllergenServiceType['create'] = async () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: AllergenServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: AllergenServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = AllergenSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(AllergenBundleSchema, {
      path: `${baseUrl}/Allergen`,
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
