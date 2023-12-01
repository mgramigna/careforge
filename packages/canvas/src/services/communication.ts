import { CommunicationSchema, type Communication } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type CommunicationServiceType = Service<Communication>;

export const CommunicationService = ({
  baseUrl,
}: {
  baseUrl: string;
}): CommunicationServiceType => {
  const read: CommunicationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(CommunicationSchema, {
      path: `${baseUrl}/Communication/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: CommunicationServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Communication`,
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
