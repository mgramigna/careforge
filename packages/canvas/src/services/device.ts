import { DeviceSchema, type Device } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type DeviceServiceType = Service<Device>;

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

  return {
    read,
    create,
  };
};
