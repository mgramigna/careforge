import {
  AllergyIntoleranceSchema,
  AllergyIntoleranceSearchArgs,
  AllergyIntoleranceSearchArgsSchema,
  BundleSchema,
  type AllergyIntolerance,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type AllergyIntoleranceServiceType = Service<
  AllergyIntolerance,
  AllergyIntoleranceSearchArgs
>;

export const AllergyIntoleranceService = ({
  baseUrl,
}: {
  baseUrl: string;
}): AllergyIntoleranceServiceType => {
  const read: AllergyIntoleranceServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(AllergyIntoleranceSchema, {
      path: `${baseUrl}/AllergyIntolerance/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: AllergyIntoleranceServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/AllergyIntolerance`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: AllergyIntoleranceServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/AllergyIntolerance/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: AllergyIntoleranceServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = AllergyIntoleranceSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(AllergyIntoleranceSchema), {
      path: `${baseUrl}/AllergyIntolerance`,
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
