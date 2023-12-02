import {
  BundleSchema,
  SlotSchema,
  SlotSearchArgsSchema,
  type Slot,
  type SlotSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type SlotServiceType = Service<Slot, SlotSearchArgs>;

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

  const update: SlotServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Slot/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: SlotServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = SlotSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(SlotSchema), {
      path: `${baseUrl}/Slot`,
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
