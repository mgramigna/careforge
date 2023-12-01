import { LocationSchema, type Location } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type LocationServiceType = Service<Location>;

export const LocationService = ({ baseUrl }: { baseUrl: string }): LocationServiceType => {
  const read: LocationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(LocationSchema, {
      path: `${baseUrl}/Location/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: LocationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Location`,
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
