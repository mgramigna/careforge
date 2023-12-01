import { MedicationStatementSchema, type MedicationStatement } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type MedicationStatementServiceType = Service<MedicationStatement>;

export const MedicationStatementService = ({
  baseUrl,
}: {
  baseUrl: string;
}): MedicationStatementServiceType => {
  const read: MedicationStatementServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(MedicationStatementSchema, {
      path: `${baseUrl}/MedicationStatement/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: MedicationStatementServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/MedicationStatement`,
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
