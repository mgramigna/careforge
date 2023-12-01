import { PatientSchema, type Patient } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type PatientServiceType = Service<Patient>;

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

  return {
    read,
    create,
  };
};
