import { err } from 'neverthrow';

import {
  ImmunizationBundleSchema,
  ImmunizationSchema,
  ImmunizationSearchArgsSchema,
  type Immunization,
  type ImmunizationBundle,
  type ImmunizationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type ImmunizationServiceType = Service<
  Immunization,
  ImmunizationSearchArgs,
  ImmunizationBundle,
  never,
  never
>;

export const ImmunizationService = ({ baseUrl }: { baseUrl: string }): ImmunizationServiceType => {
  const read: ImmunizationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ImmunizationSchema, {
      path: `${baseUrl}/Immunization/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ImmunizationServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: ImmunizationServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: ImmunizationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ImmunizationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(ImmunizationBundleSchema, {
      path: `${baseUrl}/Immunization`,
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
