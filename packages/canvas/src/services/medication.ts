import {
  BundleSchema,
  MedicationSchema,
  MedicationSearchArgs,
  MedicationSearchArgsSchema,
  type Medication,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type MedicationServiceType = Service<Medication, MedicationSearchArgs>;

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

  const update: MedicationServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Medication/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: MedicationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = MedicationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(MedicationSchema), {
      path: `${baseUrl}/Medication`,
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
