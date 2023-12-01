import { QuestionnaireResponseSchema, type QuestionnaireResponse } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type QuestionnaireResponseServiceType = Service<QuestionnaireResponse>;

export const QuestionnaireResponseService = ({
  baseUrl,
}: {
  baseUrl: string;
}): QuestionnaireResponseServiceType => {
  const read: QuestionnaireResponseServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(QuestionnaireResponseSchema, {
      path: `${baseUrl}/QuestionnaireResponse/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: QuestionnaireResponseServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/QuestionnaireResponse`,
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
