import { ProcedureSchema, type Procedure } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ProcedureServiceType = Service<Procedure>;

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

  return {
    read,
    create,
  };
};
