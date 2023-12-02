import { err } from 'neverthrow';

import {
  ProvenanceBundleSchema,
  ProvenanceSchema,
  ProvenanceSearchArgsSchema,
  type Provenance,
  type ProvenanceBundle,
  type ProvenanceSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type ProvenanceServiceType = Service<
  Provenance,
  ProvenanceSearchArgs,
  ProvenanceBundle,
  never,
  never
>;

export const ProvenanceService = ({ baseUrl }: { baseUrl: string }): ProvenanceServiceType => {
  const read: ProvenanceServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ProvenanceSchema, {
      path: `${baseUrl}/Provenance/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ProvenanceServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: ProvenanceServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
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
