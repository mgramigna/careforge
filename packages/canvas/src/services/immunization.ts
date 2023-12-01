import { ImmunizationSchema, type Immunization } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ImmunizationServiceType = Service<Immunization>;

export const ImmunizationService = ({ baseUrl }: { baseUrl: string }): ImmunizationServiceType => {
  const read: ImmunizationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ImmunizationSchema, {
      path: `${baseUrl}/Immunization/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ImmunizationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Immunization`,
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
