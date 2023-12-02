import {
  CoverageEligibilityRequestBundleSchema,
  CoverageEligibilityRequestSchema,
  CoverageEligibilityRequestSearchArgsSchema,
  type CoverageEligibilityRequest,
  type CoverageEligibilityRequestBundle,
  type CoverageEligibilityRequestSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type CoverageEligibilityRequestServiceType = Service<
  CoverageEligibilityRequest,
  CoverageEligibilityRequestSearchArgs,
  CoverageEligibilityRequestBundle,
  CoverageEligibilityRequest,
  CoverageEligibilityRequest
>;

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

  const update: CoverageEligibilityRequestServiceType['update'] = async ({
    resource,
    accessToken,
  }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/CoverageEligibilityRequest/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: CoverageEligibilityRequestServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = CoverageEligibilityRequestSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(CoverageEligibilityRequestBundleSchema, {
      path: `${baseUrl}/CoverageEligibilityRequest`,
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
