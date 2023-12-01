import { ObservationSchema, type Observation } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ObservationServiceType = Service<Observation>;

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

  return {
    read,
    create,
  };
};
