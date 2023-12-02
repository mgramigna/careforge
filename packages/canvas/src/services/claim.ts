import { err } from 'neverthrow';

import { type Claim } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest } from '../utils/fetch';

export type ClaimServiceType = Service<Claim, never, never, Claim, never>;

export const ClaimService = ({ baseUrl }: { baseUrl: string }): ClaimServiceType => {
  const read: ClaimServiceType['read'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const create: ClaimServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Claim`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ClaimServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: ClaimServiceType['search'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  return {
    read,
    create,
    update,
    search,
  };
};
