import { err } from 'neverthrow';

import {
  DeviceBundleSchema,
  DeviceSchema,
  DeviceSearchArgsSchema,
  type Device,
  type DeviceBundle,
  type DeviceSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type DeviceServiceType = Service<Device, DeviceSearchArgs, DeviceBundle, never, never>;

export const DeviceService = ({ baseUrl }: { baseUrl: string }): DeviceServiceType => {
  const read: DeviceServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(DeviceSchema, {
      path: `${baseUrl}/Device/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: DeviceServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: DeviceServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: DeviceServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = DeviceSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(DeviceBundleSchema, {
      path: `${baseUrl}/Device`,
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
