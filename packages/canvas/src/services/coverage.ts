import {
  CoverageBundleSchema,
  CoverageSchema,
  CoverageSearchArgsSchema,
  type Coverage,
  type CoverageBundle,
  type CoverageSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type CoverageServiceType = Service<
  Coverage,
  CoverageSearchArgs,
  CoverageBundle,
  Coverage,
  Coverage
>;

export const CoverageService = ({ baseUrl }: { baseUrl: string }): CoverageServiceType => {
  const read: CoverageServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CoverageSchema, {
      path: `${baseUrl}/Coverage/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CoverageServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Coverage`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: CoverageServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Coverage/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: CoverageServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = CoverageSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(CoverageBundleSchema, {
      path: `${baseUrl}/Coverage`,
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
