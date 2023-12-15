import fhirpath from 'fhirpath';

import { type MedicationStatement } from '@canvas-challenge/canvas';

export function getMedicationDisplay(medicationStatement: MedicationStatement): string | null {
  const [display] = fhirpath.evaluate(
    medicationStatement,
    'medicationCodeableConcept.coding.first().display',
  ) as string[];

  return display ?? null;
}
