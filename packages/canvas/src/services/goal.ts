import { err } from 'neverthrow';

import {
  GoalBundleSchema,
  GoalSchema,
  GoalSearchArgsSchema,
  type Goal,
  type GoalBundle,
  type GoalSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type GoalServiceType = Service<Goal, GoalSearchArgs, GoalBundle, never, never>;

export const GoalService = ({ baseUrl }: { baseUrl: string }): GoalServiceType => {
  const read: GoalServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(GoalSchema, {
      path: `${baseUrl}/Goal/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: GoalServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: GoalServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: GoalServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = GoalSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(GoalBundleSchema, {
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
