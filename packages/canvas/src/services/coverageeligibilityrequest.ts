import { CoverageEligibilityRequestSchema, type CoverageEligibilityRequest } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type CoverageEligibilityRequestServiceType = Service<CoverageEligibilityRequest>;

export const CoverageEligibilityRequestService = ({
  baseUrl,
}: {
  baseUrl: string;
}): CoverageEligibilityRequestServiceType => {
  const read: CoverageEligibilityRequestServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CoverageEligibilityRequestSchema, {
      path: `${baseUrl}/CoverageEligibilityRequest/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CoverageEligibilityRequestServiceType['create'] = async ({
    resource,
    accessToken,
  }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/CoverageEligibilityRequest`,
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
