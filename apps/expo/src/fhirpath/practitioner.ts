import fhirpath from 'fhirpath';

import { type Practitioner } from '@canvas-challenge/canvas';

export function getPractitionerName(practitioner: Practitioner): string | null {
  const [name] = fhirpath.evaluate(practitioner, "name.where(use='usual').text") as string[];

  return name ?? null;
}
