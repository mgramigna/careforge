import {
  BundleSchema,
  OrganizationSchema,
  OrganizationSearchArgs,
  OrganizationSearchArgsSchema,
  type Organization,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type OrganizationServiceType = Service<Organization, OrganizationSearchArgs>;

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

  const update: OrganizationServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Organization/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: OrganizationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = OrganizationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(OrganizationSchema), {
      path: `${baseUrl}/Organization`,
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
