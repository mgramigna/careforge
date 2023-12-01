import { PractitionerSchema, type Practitioner } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type PractitionerServiceType = Service<Practitioner>;

export const PractitionerService = ({ baseUrl }: { baseUrl: string }): PractitionerServiceType => {
  const read: PractitionerServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(PractitionerSchema, {
      path: `${baseUrl}/Practitioner/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: PractitionerServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Practitioner`,
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
