import { AllergenSchema, type Allergen } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type AllergenServiceType = Service<Allergen>;

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

  return {
    read,
    create,
  };
};
