import { EncounterSchema, type Encounter } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type EncounterServiceType = Service<Encounter>;

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

  return {
    read,
    create,
  };
};
