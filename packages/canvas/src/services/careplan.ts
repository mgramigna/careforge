import {
  BundleSchema,
  CarePlanSchema,
  CarePlanSearchArgsSchema,
  type CarePlan,
  type CarePlanSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type CarePlanServiceType = Service<CarePlan, CarePlanSearchArgs>;

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

  const update: CarePlanServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/CarePlan/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: CarePlanServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = CarePlanSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(CarePlanSchema), {
      path: `${baseUrl}/CarePlan`,
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
