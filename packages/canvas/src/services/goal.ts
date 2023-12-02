import {
  BundleSchema,
  GoalSchema,
  GoalSearchArgsSchema,
  type Goal,
  type GoalSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type GoalServiceType = Service<Goal, GoalSearchArgs>;

export const GoalService = ({ baseUrl }: { baseUrl: string }): GoalServiceType => {
  const read: GoalServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(GoalSchema, {
      path: `${baseUrl}/Goal/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: GoalServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Goal`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: GoalServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Goal/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: GoalServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = GoalSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(GoalSchema), {
      path: `${baseUrl}/Goal`,
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
