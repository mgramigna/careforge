import { ClaimSchema, type Claim } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ClaimServiceType = Service<Claim>;

export const ClaimService = ({ baseUrl }: { baseUrl: string }): ClaimServiceType => {
  const read: ClaimServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ClaimSchema, {
      path: `${baseUrl}/Claim/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ClaimServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Claim`,
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
