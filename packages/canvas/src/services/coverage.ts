import { CoverageSchema, type Coverage } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type CoverageServiceType = Service<Coverage>;

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

  return {
    read,
    create,
  };
};
