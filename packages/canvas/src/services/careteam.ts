import { CareTeamSchema, type CareTeam } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type CareTeamServiceType = Service<CareTeam>;

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

  return {
    read,
    create,
  };
};
