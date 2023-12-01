import { ScheduleSchema, type Schedule } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ScheduleServiceType = Service<Schedule>;

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

  return {
    read,
    create,
  };
};
