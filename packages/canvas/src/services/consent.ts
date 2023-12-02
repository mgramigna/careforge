import { err } from 'neverthrow';

import {
  ConsentBundleSchema,
  ConsentSchema,
  ConsentSearchArgsSchema,
  type Consent,
  type ConsentBundle,
  type ConsentSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ConsentServiceType = Service<Consent, ConsentSearchArgs, ConsentBundle, Consent, never>;

export const ConsentService = ({ baseUrl }: { baseUrl: string }): ConsentServiceType => {
  const read: ConsentServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ConsentSchema, {
      path: `${baseUrl}/Consent/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ConsentServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Consent`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ConsentServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: ConsentServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ConsentSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(ConsentBundleSchema, {
      path: `${baseUrl}/Consent`,
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
