import { getIdPartFromReference } from '@/utils/fhir';
import fhirpath from 'fhirpath';

import { type Schedule } from '@careforge/canvas';

export function getPractitionerIdFromSchedule(schedule: Schedule): string | null {
  const [practitionerReference] = fhirpath.evaluate(
    schedule,
    'actor.first().reference',
  ) as string[];

  return practitionerReference ? getIdPartFromReference(practitionerReference) : null;
}
