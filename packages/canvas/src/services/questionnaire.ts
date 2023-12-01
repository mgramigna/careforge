import { QuestionnaireSchema, type Questionnaire } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type QuestionnaireServiceType = Service<Questionnaire>;

export const QuestionnaireService = ({
  baseUrl,
}: {
  baseUrl: string;
}): QuestionnaireServiceType => {
  const read: QuestionnaireServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(QuestionnaireSchema, {
      path: `${baseUrl}/Questionnaire/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: QuestionnaireServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Questionnaire`,
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
