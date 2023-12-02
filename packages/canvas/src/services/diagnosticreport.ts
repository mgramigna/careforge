import {
  BundleSchema,
  DiagnosticReportSchema,
  DiagnosticReportSearchArgsSchema,
  type DiagnosticReport,
  type DiagnosticReportSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type DiagnosticReportServiceType = Service<DiagnosticReport, DiagnosticReportSearchArgs>;

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

  const create: DiagnosticReportServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/DiagnosticReport`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: DiagnosticReportServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/DiagnosticReport/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: DiagnosticReportServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = DiagnosticReportSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(DiagnosticReportSchema), {
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
