import fhirpath from 'fhirpath';

import { type Location } from '@careforge/canvas';

export function getLocationAddress(location: Location): string {
  const [street] = fhirpath.evaluate(location, 'address.line') as string[];

  const [city] = fhirpath.evaluate(location, 'address.city') as string[];

  const [state] = fhirpath.evaluate(location, 'address.state') as string[];

  const [postalCode] = fhirpath.evaluate(location, 'address.postalCode') as string[];

  return `${street} ${city}, ${state} ${postalCode}`;
}
