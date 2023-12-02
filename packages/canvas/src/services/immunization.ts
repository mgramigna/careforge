import {
  ImmunizationBundleSchema,
  ImmunizationSchema,
  ImmunizationSearchArgsSchema,
  type Immunization,
  type ImmunizationBundle,
  type ImmunizationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ImmunizationServiceType = Service<
  Immunization,
  ImmunizationSearchArgs,
  ImmunizationBundle,
  Immunization,
  Immunization
>;

export const ImmunizationService = ({ baseUrl }: { baseUrl: string }): ImmunizationServiceType => {
  const read: ImmunizationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ImmunizationSchema, {
      path: `${baseUrl}/Immunization/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ImmunizationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Immunization`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ImmunizationServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Immunization/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
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
