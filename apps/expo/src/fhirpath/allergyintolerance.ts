import fhirpath from 'fhirpath';

import { type AllergyIntolerance } from '@canvas-challenge/canvas';

export function getSeverityText(allergyIntolerance: AllergyIntolerance): string | null {
  const [severity] = fhirpath.evaluate(allergyIntolerance, 'reaction.severity') as string[];

  return severity ?? null;
}

export function getAllergen(allergyIntolerance: AllergyIntolerance): string | null {
  const [allergen] = fhirpath.evaluate(
    allergyIntolerance,
    'code.coding.first().display',
  ) as string[];

  return allergen ?? null;
}
