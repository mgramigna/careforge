import {
  BundleSchema,
  TaskSchema,
  TaskSearchArgsSchema,
  type Task,
  type TaskSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type TaskServiceType = Service<Task, TaskSearchArgs>;

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

  const update: TaskServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Task/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: TaskServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = TaskSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(TaskSchema), {
      path: `${baseUrl}/Task`,
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
