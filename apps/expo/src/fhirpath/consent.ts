import fhirpath from 'fhirpath';

import { type Consent } from '@canvas-challenge/canvas';

export function getConsentName(consent: Consent): string {
  const [name] = fhirpath.evaluate(consent, 'category.coding.display') as string[];

  return name ?? 'Unknown Consent';
}
