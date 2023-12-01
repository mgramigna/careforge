import { CoverageEligibilityResponseSchema, type CoverageEligibilityResponse } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type CoverageEligibilityResponseServiceType = Service<CoverageEligibilityResponse>;

export const CoverageEligibilityResponseService = ({
  baseUrl,
}: {
  baseUrl: string;
}): CoverageEligibilityResponseServiceType => {
  const read: CoverageEligibilityResponseServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CoverageEligibilityResponseSchema, {
      path: `${baseUrl}/CoverageEligibilityResponse/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CoverageEligibilityResponseServiceType['create'] = async ({
    resource,
    accessToken,
  }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/CoverageEligibilityResponse`,
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
