import { err } from 'neverthrow';

import { type CoverageEligibilityRequest } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest } from '../utils/fetch';

export type CoverageEligibilityRequestServiceType = Service<
  CoverageEligibilityRequest,
  never,
  never,
  CoverageEligibilityRequest,
  never
>;

export const CoverageEligibilityRequestService = ({
  baseUrl,
}: {
  baseUrl: string;
}): CoverageEligibilityRequestServiceType => {
  const read: CoverageEligibilityRequestServiceType['read'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
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

  const update: CoverageEligibilityRequestServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: CoverageEligibilityRequestServiceType['search'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  return {
    read,
    create,
    update,
    search,
  };
};
