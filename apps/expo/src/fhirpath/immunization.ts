import fhirpath from 'fhirpath';

import { type Immunization } from '@careforge/canvas';

export function getVaccineName(immunization: Immunization): string | null {
  const [display] = fhirpath.evaluate(
    immunization,
    'vaccineCode.coding.first().display',
  ) as string[];

  return display ?? null;
}

export function getVaccineDateString(immunization: Immunization): string | null {
  const [dateString] = fhirpath.evaluate(immunization, 'occurrenceDateTime') as string[];

  return dateString ?? null;
}
