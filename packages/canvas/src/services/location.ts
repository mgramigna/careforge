import {
  BundleSchema,
  LocationSchema,
  LocationSearchArgsSchema,
  type Location,
  type LocationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type LocationServiceType = Service<Location, LocationSearchArgs>;

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

  const update: LocationServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Location/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: LocationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = LocationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(LocationSchema), {
      path: `${baseUrl}/Location`,
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
