import { TaskSchema, type Task } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type TaskServiceType = Service<Task>;

export const TaskService = ({ baseUrl }: { baseUrl: string }): TaskServiceType => {
  const read: TaskServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(TaskSchema, {
      path: `${baseUrl}/Task/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: TaskServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Task`,
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
