import { AllergyIntoleranceSchema, type AllergyIntolerance } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type AllergyIntoleranceServiceType = Service<AllergyIntolerance>;

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

  return {
    read,
    create,
  };
};
