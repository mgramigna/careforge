import {
  BundleSchema,
  ObservationSchema,
  ObservationSearchArgs,
  ObservationSearchArgsSchema,
  type Observation,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ObservationServiceType = Service<Observation, ObservationSearchArgs>;

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

  const update: ObservationServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Observation/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: ObservationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ObservationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(ObservationSchema), {
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
