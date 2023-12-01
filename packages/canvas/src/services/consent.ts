import { ConsentSchema, type Consent } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ConsentServiceType = Service<Consent>;

export const ConsentService = ({ baseUrl }: { baseUrl: string }): ConsentServiceType => {
  const read: ConsentServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ConsentSchema, {
      path: `${baseUrl}/Consent/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ConsentServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Consent`,
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
