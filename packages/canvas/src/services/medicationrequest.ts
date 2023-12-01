import { MedicationRequestSchema, type MedicationRequest } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type MedicationRequestServiceType = Service<MedicationRequest>;

export const MedicationRequestService = ({
  baseUrl,
}: {
  baseUrl: string;
}): MedicationRequestServiceType => {
  const read: MedicationRequestServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(MedicationRequestSchema, {
      path: `${baseUrl}/MedicationRequest/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: MedicationRequestServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/MedicationRequest`,
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
