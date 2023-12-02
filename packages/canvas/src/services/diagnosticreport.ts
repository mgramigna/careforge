import { err } from 'neverthrow';

import {
  DiagnosticReportBundleSchema,
  DiagnosticReportSchema,
  DiagnosticReportSearchArgsSchema,
  type DiagnosticReport,
  type DiagnosticReportBundle,
  type DiagnosticReportSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type DiagnosticReportServiceType = Service<
  DiagnosticReport,
  DiagnosticReportSearchArgs,
  DiagnosticReportBundle,
  never,
  never
>;

export const DiagnosticReportService = ({
  baseUrl,
}: {
  baseUrl: string;
}): DiagnosticReportServiceType => {
  const read: DiagnosticReportServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(DiagnosticReportSchema, {
      path: `${baseUrl}/DiagnosticReport/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: DiagnosticReportServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: DiagnosticReportServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: DiagnosticReportServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = DiagnosticReportSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(DiagnosticReportBundleSchema, {
      path: `${baseUrl}/DiagnosticReport`,
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
