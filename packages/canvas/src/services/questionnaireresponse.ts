import {
  BundleSchema,
  QuestionnaireResponseSchema,
  QuestionnaireResponseSearchArgsSchema,
  type QuestionnaireResponse,
  type QuestionnaireResponseSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type QuestionnaireResponseServiceType = Service<
  QuestionnaireResponse,
  QuestionnaireResponseSearchArgs
>;

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

  const update: QuestionnaireResponseServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/QuestionnaireResponse/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: QuestionnaireResponseServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = QuestionnaireResponseSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(QuestionnaireResponseSchema), {
      path: `${baseUrl}/QuestionnaireResponse`,
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
