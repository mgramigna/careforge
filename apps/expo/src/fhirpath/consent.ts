import fhirpath from 'fhirpath';

import { type Consent } from '@careforge/canvas';

export function getConsentName(consent: Consent): string {
  const [name] = fhirpath.evaluate(consent, 'category.coding.display') as string[];

  return name ?? 'Unknown Consent';
}

export function getConsentCode(consent: Consent): string {
  const [code] = fhirpath.evaluate(consent, 'category.coding.code') as string[];

  return code!;
}
