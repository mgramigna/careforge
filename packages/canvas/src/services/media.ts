import { MediaSchema, type Media } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type MediaServiceType = Service<Media>;

export const MediaService = ({ baseUrl }: { baseUrl: string }): MediaServiceType => {
  const read: MediaServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(MediaSchema, {
      path: `${baseUrl}/Media/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: MediaServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Media`,
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
