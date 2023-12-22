import fhirpath from 'fhirpath';

import { type MedicationStatement } from '@careforge/canvas';

export function getMedicationDisplay(medicationStatement: MedicationStatement): string | null {
  const [display] = fhirpath.evaluate(
    medicationStatement,
    'medicationCodeableConcept.coding.first().display',
  ) as string[];

  return display ?? null;
}

export function getDosageText(medicationStatement: MedicationStatement): string | undefined {
  const [text] = fhirpath.evaluate(medicationStatement, 'dosage.first().text') as string[];

  return text;
}
