import fhirpath from 'fhirpath';

import { type Medication } from '@careforge/canvas';

export function getMedicationDisplay(medication: Medication): string | undefined {
  const [display] = fhirpath.evaluate(
    medication,
    "code.coding.where(system='http://www.fdbhealth.com/').display",
  ) as string[];

  return display;
}
