import { err } from 'neverthrow';

import {
  CarePlanBundleSchema,
  CarePlanSchema,
  CarePlanSearchArgsSchema,
  type CarePlan,
  type CarePlanBundle,
  type CarePlanSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type CarePlanServiceType = Service<
  CarePlan,
  CarePlanSearchArgs,
  CarePlanBundle,
  never,
  never
>;

export const CarePlanService = ({ baseUrl }: { baseUrl: string }): CarePlanServiceType => {
  const read: CarePlanServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CarePlanSchema, {
      path: `${baseUrl}/CarePlan/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CarePlanServiceType['create'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: CarePlanServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: CarePlanServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = CarePlanSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(CarePlanBundleSchema, {
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
