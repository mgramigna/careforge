import { getIdPartFromReference } from '@/utils/fhir';
import fhirpath from 'fhirpath';

import { type Coverage } from '@careforge/canvas';

export function getPayorId(coverage: Coverage): string {
  const [reference] = fhirpath.evaluate(coverage, 'payor.first().reference') as string[];

  return getIdPartFromReference(reference!);
}

export function getPayorName(coverage: Coverage): string {
  const [name] = fhirpath.evaluate(coverage, 'payor.first().display') as string[];

  return name!;
}

export function getGroupId(coverage: Coverage): string | undefined {
  const [groupId] = fhirpath.evaluate(
    coverage,
    "class.where(type.coding.code='group').value",
  ) as string[];

  return groupId;
}
