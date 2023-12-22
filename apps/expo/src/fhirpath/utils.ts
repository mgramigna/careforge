import fhirpath from 'fhirpath';

import { type CodeableConcept } from '@careforge/canvas';

export function getCodeFromConcept(codeableConcept?: CodeableConcept): string | undefined {
  if (!codeableConcept) return undefined;

  const [code] = fhirpath.evaluate(codeableConcept, 'coding.first().code') as string[];

  return code;
}

export function getDisplayFromConcept(codeableConcept?: CodeableConcept): string | undefined {
  if (!codeableConcept) return undefined;

  const [display] = fhirpath.evaluate(codeableConcept, 'coding.first().display') as string[];

  return display;
}
