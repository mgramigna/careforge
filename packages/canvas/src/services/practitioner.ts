import {
  PractitionerBundleSchema,
  PractitionerSchema,
  PractitionerSearchArgsSchema,
  type Practitioner,
  type PractitionerBundle,
  type PractitionerSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type PractitionerServiceType = Service<
  Practitioner,
  PractitionerSearchArgs,
  PractitionerBundle,
  Practitioner,
  Practitioner
>;

export const PractitionerService = ({ baseUrl }: { baseUrl: string }): PractitionerServiceType => {
  const read: PractitionerServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(PractitionerSchema, {
      path: `${baseUrl}/Practitioner/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: PractitionerServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Practitioner`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: PractitionerServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Practitioner/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: PractitionerServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = PractitionerSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(PractitionerBundleSchema, {
      path: `${baseUrl}/Practitioner`,
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
