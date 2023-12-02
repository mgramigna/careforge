import { err } from 'neverthrow';

import {
  DocumentReferenceBundleSchema,
  DocumentReferenceSchema,
  DocumentReferenceSearchArgsSchema,
  type DocumentReference,
  type DocumentReferenceBundle,
  type DocumentReferenceSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type DocumentReferenceServiceType = Service<
  DocumentReference,
  DocumentReferenceSearchArgs,
  DocumentReferenceBundle,
  never,
  never
>;

export const DocumentReferenceService = ({
  baseUrl,
}: {
  baseUrl: string;
}): DocumentReferenceServiceType => {
  const read: DocumentReferenceServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(DocumentReferenceSchema, {
      path: `${baseUrl}/DocumentReference/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: DocumentReferenceServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: DocumentReferenceServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: DocumentReferenceServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = DocumentReferenceSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(DocumentReferenceBundleSchema, {
      path: `${baseUrl}/DocumentReference`,
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
