import { OFFICE_VISIT_CODE, TELEHEALTH_VISIT_CODE } from '@/utils/constants';
import { getIdPartFromReference } from '@/utils/fhir';
import fhirpath from 'fhirpath';
import { match } from 'ts-pattern';

import { type Appointment } from '@careforge/canvas';

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

export function getAppointmentType(appointment: Appointment): 'office' | 'telehealth' | 'unknown' {
  const [code] = fhirpath.evaluate(appointment, 'appointmentType.coding.first().code') as string[];

  return match(code)
    .with(OFFICE_VISIT_CODE, () => 'office' as const)
    .with(TELEHEALTH_VISIT_CODE, () => 'telehealth' as const)
    .otherwise(() => 'unknown' as const);
}
