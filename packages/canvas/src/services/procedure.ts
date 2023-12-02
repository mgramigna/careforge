import {
  ProcedureBundleSchema,
  ProcedureSchema,
  ProcedureSearchArgsSchema,
  type Procedure,
  type ProcedureBundle,
  type ProcedureSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ProcedureServiceType = Service<
  Procedure,
  ProcedureSearchArgs,
  ProcedureBundle,
  Procedure,
  Procedure
>;

export const ProcedureService = ({ baseUrl }: { baseUrl: string }): ProcedureServiceType => {
  const read: ProcedureServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ProcedureSchema, {
      path: `${baseUrl}/Procedure/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ProcedureServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Procedure`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ProcedureServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Procedure/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: ProcedureServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ProcedureSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(ProcedureBundleSchema, {
      path: `${baseUrl}/Procedure`,
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
