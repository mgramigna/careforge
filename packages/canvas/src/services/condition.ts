import { ConditionSchema, type Condition } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ConditionServiceType = Service<Condition>;

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

  return {
    read,
    create,
  };
};
