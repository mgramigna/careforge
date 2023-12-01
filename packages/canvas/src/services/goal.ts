import { GoalSchema, type Goal } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type GoalServiceType = Service<Goal>;

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

  return {
    read,
    create,
  };
};
