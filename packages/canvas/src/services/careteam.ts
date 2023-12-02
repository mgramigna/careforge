import { err } from 'neverthrow';

import {
  CareTeamBundleSchema,
  CareTeamSchema,
  CareTeamSearchArgsSchema,
  type CareTeam,
  type CareTeamBundle,
  type CareTeamSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type CareTeamServiceType = Service<
  CareTeam,
  CareTeamSearchArgs,
  CareTeamBundle,
  never,
  CareTeam
>;

export const CareTeamService = ({ baseUrl }: { baseUrl: string }): CareTeamServiceType => {
  const read: CareTeamServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CareTeamSchema, {
      path: `${baseUrl}/CareTeam/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CareTeamServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: CareTeamServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/CareTeam/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: CareTeamServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = CareTeamSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(CareTeamBundleSchema, {
      path: `${baseUrl}/CareTeam`,
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
