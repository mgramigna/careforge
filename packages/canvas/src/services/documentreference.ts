import {
  BundleSchema,
  DocumentReferenceSchema,
  DocumentReferenceSearchArgs,
  DocumentReferenceSearchArgsSchema,
  type DocumentReference,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type DocumentReferenceServiceType = Service<DocumentReference, DocumentReferenceSearchArgs>;

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

  const create: DocumentReferenceServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/DocumentReference`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: DocumentReferenceServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/DocumentReference/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: DocumentReferenceServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = DocumentReferenceSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(DocumentReferenceSchema), {
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
