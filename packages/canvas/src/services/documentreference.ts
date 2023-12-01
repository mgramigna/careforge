import { DocumentReferenceSchema, type DocumentReference } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type DocumentReferenceServiceType = Service<DocumentReference>;

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

  return {
    read,
    create,
  };
};
