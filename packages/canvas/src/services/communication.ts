import { err } from 'neverthrow';

import {
  CommunicationBundleSchema,
  CommunicationSchema,
  CommunicationSearchArgsSchema,
  type Communication,
  type CommunicationBundle,
  type CommunicationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type CommunicationServiceType = Service<
  Communication,
  CommunicationSearchArgs,
  CommunicationBundle,
  Communication,
  never
>;

export const CommunicationService = ({
  baseUrl,
}: {
  baseUrl: string;
}): CommunicationServiceType => {
  const read: CommunicationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CommunicationSchema, {
      path: `${baseUrl}/Communication/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CommunicationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Communication`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: CommunicationServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: CommunicationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = CommunicationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(CommunicationBundleSchema, {
      path: `${baseUrl}/Communication`,
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
