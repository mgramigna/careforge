import { DiagnosticReportSchema, type DiagnosticReport } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type DiagnosticReportServiceType = Service<DiagnosticReport>;

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

  return {
    read,
    create,
  };
};
