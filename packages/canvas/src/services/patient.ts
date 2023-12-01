import { type Result } from 'neverthrow';

import { PatientSchema, type Patient } from '../models';
import { Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export class PatientService extends Service<Patient> {
  async read({ id, accessToken }: { id: string; accessToken: string }) {
    const response = await makeFhirGetRequest(PatientSchema, {
      path: `${this.baseUrl}/Patient/${id}`,
      token: accessToken,
    });

    return response;
  }

  async create(
    { resource, accessToken }: { resource: Omit<Patient, 'id'>; accessToken: string },
  ): Promise<Result<string, string>> {
    const response = await makeFhirCreateRequest({
      path: `${this.baseUrl}/Patient`,
      token: accessToken,
      body: resource,
    });

    return response;
  }
}
