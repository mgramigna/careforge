import {
  BundleSchema,
  PatientSchema,
  PatientSearchArgs,
  PatientSearchArgsSchema,
  type Patient,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type PatientServiceType = Service<Patient, PatientSearchArgs>;

export const PatientService = ({ baseUrl }: { baseUrl: string }): PatientServiceType => {
  const read: PatientServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(PatientSchema, {
      path: `${baseUrl}/Patient/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: PatientServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Patient`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: PatientServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Patient/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: PatientServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = PatientSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(PatientSchema), {
      path: `${baseUrl}/Patient`,
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
