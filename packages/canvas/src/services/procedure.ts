import { err } from 'neverthrow';

import {
  ProcedureBundleSchema,
  ProcedureSchema,
  ProcedureSearchArgsSchema,
  type Procedure,
  type ProcedureBundle,
  type ProcedureSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type ProcedureServiceType = Service<
  Procedure,
  ProcedureSearchArgs,
  ProcedureBundle,
  never,
  never
>;

export const ProcedureService = ({ baseUrl }: { baseUrl: string }): ProcedureServiceType => {
  const read: ProcedureServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ProcedureSchema, {
      path: `${baseUrl}/Procedure/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ProcedureServiceType['create'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const update: ProcedureServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
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
