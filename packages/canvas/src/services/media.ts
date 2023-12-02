import { err } from 'neverthrow';

import {
  MediaBundleSchema,
  MediaSchema,
  MediaSearchArgsSchema,
  type Media,
  type MediaBundle,
  type MediaSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type MediaServiceType = Service<Media, MediaSearchArgs, MediaBundle, Media, never>;

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

  const update: MediaServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: MediaServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = MediaSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(MediaBundleSchema, {
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
