import {
  BundleSchema,
  CommunicationSchema,
  CommunicationSearchArgsSchema,
  type Communication,
  type CommunicationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type CommunicationServiceType = Service<Communication, CommunicationSearchArgs>;

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

  const update: CommunicationServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Communication/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: CommunicationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = CommunicationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(CommunicationSchema), {
      path: `${baseUrl}/Communication`,
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
