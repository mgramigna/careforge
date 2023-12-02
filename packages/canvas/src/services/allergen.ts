import {
  AllergenBundleSchema,
  AllergenSchema,
  AllergenSearchArgsSchema,
  type Allergen,
  type AllergenBundle,
  type AllergenSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type AllergenServiceType = Service<
  Allergen,
  AllergenSearchArgs,
  AllergenBundle,
  Allergen,
  Allergen
>;

export const AllergenService = ({ baseUrl }: { baseUrl: string }): AllergenServiceType => {
  const read: AllergenServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(AllergenSchema, {
      path: `${baseUrl}/Allergen/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: AllergenServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Allergen`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: AllergenServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Allergen/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: AllergenServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = AllergenSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(AllergenBundleSchema, {
      path: `${baseUrl}/Allergen`,
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
