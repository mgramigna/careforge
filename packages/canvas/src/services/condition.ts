import {
  BundleSchema,
  ConditionSchema,
  ConditionSearchArgs,
  ConditionSearchArgsSchema,
  type Condition,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ConditionServiceType = Service<Condition, ConditionSearchArgs>;

export const ConditionService = ({ baseUrl }: { baseUrl: string }): ConditionServiceType => {
  const read: ConditionServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ConditionSchema, {
      path: `${baseUrl}/Condition/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ConditionServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Condition`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ConditionServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Condition/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: ConditionServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ConditionSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(ConditionSchema), {
      path: `${baseUrl}/Condition`,
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
