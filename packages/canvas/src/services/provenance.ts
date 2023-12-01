import { ProvenanceSchema, type Provenance } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ProvenanceServiceType = Service<Provenance>;

export const ProvenanceService = ({ baseUrl }: { baseUrl: string }): ProvenanceServiceType => {
  const read: ProvenanceServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(ProvenanceSchema, {
      path: `${baseUrl}/Provenance/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: ProvenanceServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Provenance`,
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
