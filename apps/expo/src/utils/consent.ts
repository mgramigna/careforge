import { getConsentCode } from '@/fhirpath/consent';
import { match } from 'ts-pattern';

import { type Consent } from '@careforge/canvas';

export type ConsentType = 'release-of-information' | 'unknown';

export function getConsentType(consent: Consent): ConsentType {
  return match(getConsentCode(consent))
    .with('64292-6', () => 'release-of-information' as const)
    .otherwise(() => 'unknown' as const);
}
