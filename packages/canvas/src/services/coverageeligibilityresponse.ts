import {
  BundleSchema,
  CoverageEligibilityResponseSchema,
  CoverageEligibilityResponseSearchArgs,
  CoverageEligibilityResponseSearchArgsSchema,
  type CoverageEligibilityResponse,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type CoverageEligibilityResponseServiceType = Service<
  CoverageEligibilityResponse,
  CoverageEligibilityResponseSearchArgs
>;

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

  const update: CoverageEligibilityResponseServiceType['update'] = async ({
    resource,
    accessToken,
  }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/CoverageEligibilityResponse/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: CoverageEligibilityResponseServiceType['search'] = async ({
    accessToken,
    args,
  }) => {
    const parsedArgs = CoverageEligibilityResponseSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(CoverageEligibilityResponseSchema), {
      path: `${baseUrl}/CoverageEligibilityResponse`,
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
