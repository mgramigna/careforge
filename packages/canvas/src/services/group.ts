import {
  GroupBundleSchema,
  GroupSchema,
  GroupSearchArgsSchema,
  type Group,
  type GroupBundle,
  type GroupSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type GroupServiceType = Service<Group, GroupSearchArgs, GroupBundle, Group, Group>;

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

  const update: GroupServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Group/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: GroupServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = GroupSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(GroupBundleSchema, {
      path: `${baseUrl}/Group`,
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
