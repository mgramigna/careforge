import { err } from 'neverthrow';

import {
  CoverageEligibilityResponseBundleSchema,
  CoverageEligibilityResponseSearchArgsSchema,
  type CoverageEligibilityResponse,
  type CoverageEligibilityResponseBundle,
  type CoverageEligibilityResponseSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type CoverageEligibilityResponseServiceType = Service<
  CoverageEligibilityResponse,
  CoverageEligibilityResponseSearchArgs,
  CoverageEligibilityResponseBundle,
  never,
  never
>;

export const CoverageEligibilityResponseService = ({
  baseUrl,
}: {
  baseUrl: string;
}): CoverageEligibilityResponseServiceType => {
  const read: CoverageEligibilityResponseServiceType['read'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const create: CoverageEligibilityResponseServiceType['create'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: CoverageEligibilityResponseServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: CoverageEligibilityResponseServiceType['search'] = async ({
    accessToken,
    args,
  }) => {
    const parsedArgs = CoverageEligibilityResponseSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(CoverageEligibilityResponseBundleSchema, {
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
