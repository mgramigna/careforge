import {
  BundleSchema,
  CareTeamSchema,
  CareTeamSearchArgs,
  CareTeamSearchArgsSchema,
  type CareTeam,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type CareTeamServiceType = Service<CareTeam, CareTeamSearchArgs>;

export const CareTeamService = ({ baseUrl }: { baseUrl: string }): CareTeamServiceType => {
  const read: CareTeamServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CareTeamSchema, {
      path: `${baseUrl}/CareTeam/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CareTeamServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/CareTeam`,
      token: accessToken,
      body: resource,
    });

    return response;
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
    const response = await makeFhirGetRequest(BundleSchema(CareTeamSchema), {
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
