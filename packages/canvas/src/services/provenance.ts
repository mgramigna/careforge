import {
  ProvenanceBundleSchema,
  ProvenanceSchema,
  ProvenanceSearchArgsSchema,
  type Provenance,
  type ProvenanceBundle,
  type ProvenanceSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ProvenanceServiceType = Service<
  Provenance,
  ProvenanceSearchArgs,
  ProvenanceBundle,
  Provenance,
  Provenance
>;

export const ProvenanceService = ({ baseUrl }: { baseUrl: string }): ProvenanceServiceType => {
  const read: ProvenanceServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ProvenanceSchema, {
      path: `${baseUrl}/Provenance/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ProvenanceServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Provenance`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ProvenanceServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Provenance/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: ProvenanceServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ProvenanceSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(ProvenanceBundleSchema, {
      path: `${baseUrl}/Provenance`,
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
