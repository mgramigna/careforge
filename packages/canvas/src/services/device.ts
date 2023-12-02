import {
  BundleSchema,
  DeviceSchema,
  DeviceSearchArgsSchema,
  type Device,
  type DeviceSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type DeviceServiceType = Service<Device, DeviceSearchArgs>;

export const DeviceService = ({ baseUrl }: { baseUrl: string }): DeviceServiceType => {
  const read: DeviceServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(DeviceSchema, {
      path: `${baseUrl}/Device/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: DeviceServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Device`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: DeviceServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Device/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: DeviceServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = DeviceSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(DeviceSchema), {
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
