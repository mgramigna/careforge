import { CarePlanSchema, type CarePlan } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type CarePlanServiceType = Service<CarePlan>;

export const CarePlanService = ({ baseUrl }: { baseUrl: string }): CarePlanServiceType => {
  const read: CarePlanServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CarePlanSchema, {
      path: `${baseUrl}/CarePlan/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CarePlanServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/CarePlan`,
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
