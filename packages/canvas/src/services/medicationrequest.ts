import {
  MedicationRequestBundleSchema,
  MedicationRequestSchema,
  MedicationRequestSearchArgsSchema,
  type MedicationRequest,
  type MedicationRequestBundle,
  type MedicationRequestSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type MedicationRequestServiceType = Service<
  MedicationRequest,
  MedicationRequestSearchArgs,
  MedicationRequestBundle,
  MedicationRequest,
  MedicationRequest
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

  const create: MedicationRequestServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/MedicationRequest`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: MedicationRequestServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/MedicationRequest/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
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
