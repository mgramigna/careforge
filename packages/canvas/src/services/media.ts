import {
  BundleSchema,
  MediaSchema,
  MediaSearchArgsSchema,
  type Media,
  type MediaSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type MediaServiceType = Service<Media, MediaSearchArgs>;

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

  const update: MediaServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Media/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: MediaServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = MediaSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(MediaSchema), {
      path: `${baseUrl}/Media`,
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
