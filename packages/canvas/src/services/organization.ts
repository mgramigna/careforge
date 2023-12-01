import { OrganizationSchema, type Organization } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type OrganizationServiceType = Service<Organization>;

export const OrganizationService = ({ baseUrl }: { baseUrl: string }): OrganizationServiceType => {
  const read: OrganizationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(OrganizationSchema, {
      path: `${baseUrl}/Organization/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: OrganizationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Organization`,
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
