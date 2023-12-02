import {
  BundleSchema,
  MedicationStatementSchema,
  MedicationStatementSearchArgs,
  MedicationStatementSearchArgsSchema,
  type MedicationStatement,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type MedicationStatementServiceType = Service<
  MedicationStatement,
  MedicationStatementSearchArgs
>;

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

  const update: MedicationStatementServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/MedicationStatement/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: MedicationStatementServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = MedicationStatementSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(MedicationStatementSchema), {
      path: `${baseUrl}/MedicationStatement`,
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
