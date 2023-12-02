import {
  BundleSchema,
  EncounterSchema,
  EncounterSearchArgsSchema,
  type Encounter,
  type EncounterSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type EncounterServiceType = Service<Encounter, EncounterSearchArgs>;

export const EncounterService = ({ baseUrl }: { baseUrl: string }): EncounterServiceType => {
  const read: EncounterServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(EncounterSchema, {
      path: `${baseUrl}/Encounter/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: EncounterServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Encounter`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: EncounterServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Encounter/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: EncounterServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = EncounterSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(EncounterSchema), {
      path: `${baseUrl}/Encounter`,
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
