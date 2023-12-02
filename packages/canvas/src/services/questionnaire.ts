import { err } from 'neverthrow';

import {
  QuestionnaireBundleSchema,
  QuestionnaireSchema,
  QuestionnaireSearchArgsSchema,
  type Questionnaire,
  type QuestionnaireBundle,
  type QuestionnaireSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type QuestionnaireServiceType = Service<
  Questionnaire,
  QuestionnaireSearchArgs,
  QuestionnaireBundle,
  never,
  never
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

  const create: QuestionnaireServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: QuestionnaireServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
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
