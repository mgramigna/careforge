import { err } from 'neverthrow';

import {
  TaskBundleSchema,
  TaskSearchArgsSchema,
  type Task,
  type TaskBundle,
  type TaskSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type TaskServiceType = Service<Task, TaskSearchArgs, TaskBundle, Task, Task>;

export const TaskService = ({ baseUrl }: { baseUrl: string }): TaskServiceType => {
  const read: TaskServiceType['read'] = () => {
    return Promise.resolve(
      err({
        errorType: 'UNSUPPORTED',
      }),
    );
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
    const response = await makeFhirGetRequest(TaskBundleSchema, {
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
