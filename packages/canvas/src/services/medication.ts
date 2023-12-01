import { MedicationSchema, type Medication } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type MedicationServiceType = Service<Medication>;

export const MedicationService = ({ baseUrl }: { baseUrl: string }): MedicationServiceType => {
  const read: MedicationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(MedicationSchema, {
      path: `${baseUrl}/Medication/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: MedicationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Medication`,
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
