import fhirpath from 'fhirpath';

import { type Patient } from '@canvas-challenge/canvas';

export function getFirstName(patient: Patient): string {
  const [usualFirstName] = fhirpath.evaluate(
    patient,
    "name.where(use='usual').given.first()",
  ) as string[];

  if (usualFirstName) return usualFirstName;

  const [officialFirstName] = fhirpath.evaluate(
    patient,
    "name.where(use='official').given.first()",
  ) as string[];

  if (officialFirstName) return officialFirstName;

  const [firstName] = fhirpath.evaluate(patient, 'name.given.first()') as string[];

  return firstName ?? '';
}

export function getLastName(patient: Patient): string {
  const [lastName] = fhirpath.evaluate(patient, "name.where(use='official').family") as string[];

  return lastName ?? '';
}

export function getFullName(patient: Patient): string {
  return `${getFirstName(patient)} ${getLastName(patient)}`;
}

export function getPhoto(patient: Patient): string | undefined {
  const [photoUrl] = fhirpath.evaluate(patient, 'photo.first().url') as string[];

  return photoUrl;
}

const RACE_EXTENSION_URL = 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race';
const ETHNICITY_EXTENSION_URL = 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity';

export function getRaces(patient: Patient): string[] {
  const races = fhirpath.evaluate(
    patient,
    `extension.where(url='${RACE_EXTENSION_URL}').extension.where(url='ombCategory').valueCoding.display`,
  ) as string[];

  return races;
}

export function getEthnicities(patient: Patient): string[] {
  const races = fhirpath.evaluate(
    patient,
    `extension.where(url='${ETHNICITY_EXTENSION_URL}').extension.where(url='ombCategory').valueCoding.display`,
  ) as string[];

  return races;
}
