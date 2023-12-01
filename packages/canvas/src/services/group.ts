import { GroupSchema, type Group } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type GroupServiceType = Service<Group>;

export const GroupService = ({ baseUrl }: { baseUrl: string }): GroupServiceType => {
  const read: GroupServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(GroupSchema, {
      path: `${baseUrl}/Group/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: GroupServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Group`,
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
