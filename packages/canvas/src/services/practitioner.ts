import { err } from 'neverthrow';

import {
  PractitionerBundleSchema,
  PractitionerSchema,
  PractitionerSearchArgsSchema,
  type Practitioner,
  type PractitionerBundle,
  type PractitionerSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type PractitionerServiceType = Service<
  Practitioner,
  PractitionerSearchArgs,
  PractitionerBundle,
  never,
  never
>;

export const PractitionerService = ({ baseUrl }: { baseUrl: string }): PractitionerServiceType => {
  const read: PractitionerServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(PractitionerSchema, {
      path: `${baseUrl}/Practitioner/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: PractitionerServiceType['create'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: PractitionerServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: PractitionerServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = PractitionerSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(PractitionerBundleSchema, {
      path: `${baseUrl}/Practitioner`,
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
