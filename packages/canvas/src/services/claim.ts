import {
  BundleSchema,
  ClaimSchema,
  ClaimSearchArgs,
  ClaimSearchArgsSchema,
  type Claim,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ClaimServiceType = Service<Claim, ClaimSearchArgs>;

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

  const update: ClaimServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Claim/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: ClaimServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ClaimSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(ClaimSchema), {
      path: `${baseUrl}/Claim`,
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
