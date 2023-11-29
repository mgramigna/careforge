import { type Result } from 'neverthrow';

import { PatientSchema, type Patient } from '../models';
import { makeFhirRequest } from '../utils/fetch';

export async function read({
  id,
  baseUrl,
  token,
}: {
  id: string;
  baseUrl: string;
  token: string;
}): Promise<Result<Patient, string>> {
  const response = await makeFhirRequest(PatientSchema, {
    path: `${baseUrl}/Patient/${id}`,
    token,
  });

  return response;
}
