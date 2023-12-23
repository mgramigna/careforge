import { err } from 'neverthrow';

import {
  ScheduleBundleSchema,
  ScheduleSearchArgsSchema,
  type Schedule,
  type ScheduleBundle,
  type ScheduleSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type ScheduleServiceType = Service<
  Schedule,
  ScheduleSearchArgs,
  ScheduleBundle,
  never,
  never
>;

export const ScheduleService = ({ baseUrl }: { baseUrl: string }): ScheduleServiceType => {
  const read: ScheduleServiceType['read'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const create: ScheduleServiceType['create'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: ScheduleServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: ScheduleServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ScheduleSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(ScheduleBundleSchema, {
      path: `${baseUrl}/Schedule`,
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
