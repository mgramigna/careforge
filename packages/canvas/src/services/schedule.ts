import {
  BundleSchema,
  ScheduleSchema,
  ScheduleSearchArgs,
  ScheduleSearchArgsSchema,
  type Schedule,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ScheduleServiceType = Service<Schedule, ScheduleSearchArgs>;

export const ScheduleService = ({ baseUrl }: { baseUrl: string }): ScheduleServiceType => {
  const read: ScheduleServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ScheduleSchema, {
      path: `${baseUrl}/Schedule/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ScheduleServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Schedule`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ScheduleServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Schedule/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: ScheduleServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ScheduleSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(ScheduleSchema), {
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
