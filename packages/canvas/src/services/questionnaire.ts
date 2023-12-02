import {
  QuestionnaireBundleSchema,
  QuestionnaireSchema,
  QuestionnaireSearchArgsSchema,
  type Questionnaire,
  type QuestionnaireBundle,
  type QuestionnaireSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type QuestionnaireServiceType = Service<
  Questionnaire,
  QuestionnaireSearchArgs,
  QuestionnaireBundle,
  Questionnaire,
  Questionnaire
>;

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

  const update: QuestionnaireServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Questionnaire/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: QuestionnaireServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = QuestionnaireSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(QuestionnaireBundleSchema, {
      path: `${baseUrl}/Questionnaire`,
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
