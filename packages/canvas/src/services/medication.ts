import { err } from 'neverthrow';

import {
  MedicationBundleSchema,
  MedicationSchema,
  MedicationSearchArgsSchema,
  type Medication,
  type MedicationBundle,
  type MedicationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type MedicationServiceType = Service<
  Medication,
  MedicationSearchArgs,
  MedicationBundle,
  never,
  never
>;

export const MedicationService = ({ baseUrl }: { baseUrl: string }): MedicationServiceType => {
  const read: MedicationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(MedicationSchema, {
      path: `${baseUrl}/Medication/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: MedicationServiceType['create'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: MedicationServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: MedicationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = MedicationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(MedicationBundleSchema, {
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
