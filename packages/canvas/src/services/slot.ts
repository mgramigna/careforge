import { SlotSchema, type Slot } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type SlotServiceType = Service<Slot>;

export const SlotService = ({ baseUrl }: { baseUrl: string }): SlotServiceType => {
  const read: SlotServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(SlotSchema, {
      path: `${baseUrl}/Slot/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: SlotServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Slot`,
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
