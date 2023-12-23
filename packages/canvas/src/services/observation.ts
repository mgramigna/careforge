import { err } from 'neverthrow';

import {
  ObservationBundleSchema,
  ObservationSchema,
  ObservationSearchArgsSchema,
  type Observation,
  type ObservationBundle,
  type ObservationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ObservationServiceType = Service<
  Observation,
  ObservationSearchArgs,
  ObservationBundle,
  Observation,
  never
>;

export const ObservationService = ({ baseUrl }: { baseUrl: string }): ObservationServiceType => {
  const read: ObservationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ObservationSchema, {
      path: `${baseUrl}/Observation/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ObservationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Observation`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ObservationServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: ObservationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ObservationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(ObservationBundleSchema, {
      path: `${baseUrl}/Observation`,
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
