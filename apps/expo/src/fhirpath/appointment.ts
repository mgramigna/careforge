import { getIdPartFromReference } from '@/utils/fhir';
import fhirpath from 'fhirpath';

import { type Appointment } from '@canvas-challenge/canvas';

export function getLocation(appointment: Appointment): string | null {
  const [result] = fhirpath.evaluate(
    appointment,
    "supportingInformation.where(type='Location').reference",
  ) as string[];

  return result ? getIdPartFromReference(result) : null;
}

export function getPractitionerId(appointment: Appointment): string | null {
  const [result] = fhirpath.evaluate(
    appointment,
    "participant.actor.where(type='Practitioner').reference",
  ) as string[];

  return result ? getIdPartFromReference(result) : null;
}

export function getReason(appointment: Appointment): string | null {
  const [result] = fhirpath.evaluate(appointment, 'reasonCode.text') as string[];

  return result ?? null;
}
