import { err } from 'neverthrow';

import {
  MedicationRequestBundleSchema,
  MedicationRequestSchema,
  MedicationRequestSearchArgsSchema,
  type MedicationRequest,
  type MedicationRequestBundle,
  type MedicationRequestSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type MedicationRequestServiceType = Service<
  MedicationRequest,
  MedicationRequestSearchArgs,
  MedicationRequestBundle,
  never,
  never
>;

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

  const create: MedicationRequestServiceType['create'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: MedicationRequestServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: MedicationRequestServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = MedicationRequestSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(MedicationRequestBundleSchema, {
      path: `${baseUrl}/MedicationRequest`,
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
