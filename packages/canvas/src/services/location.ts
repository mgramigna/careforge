import { err } from 'neverthrow';

import {
  LocationBundleSchema,
  LocationSchema,
  LocationSearchArgsSchema,
  type Location,
  type LocationBundle,
  type LocationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type LocationServiceType = Service<
  Location,
  LocationSearchArgs,
  LocationBundle,
  never,
  never
>;

export const LocationService = ({ baseUrl }: { baseUrl: string }): LocationServiceType => {
  const read: LocationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(LocationSchema, {
      path: `${baseUrl}/Location/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: LocationServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: LocationServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: LocationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = LocationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(LocationBundleSchema, {
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
