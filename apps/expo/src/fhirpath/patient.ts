import {
  ETHNICITY_EXTENSION_URL,
  GENDER_CODE_TO_DISPLAY,
  GENDER_IDENTITY_EXTENSION_URL,
  RACE_EXTENSION_URL,
  type EthnicityCode,
  type GenderCode,
  type GenderIdentity,
  type RaceCode,
} from '@/types/patient';
import fhirpath from 'fhirpath';

import { type Patient } from '@careforge/canvas';

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

export function getPhone(patient: Patient): string | undefined {
  const [phone] = fhirpath.evaluate(
    patient,
    "telecom.where(system='phone').first().value",
  ) as string[];

  return phone;
}

export function getRaceDisplays(patient: Patient): string[] {
  const races = fhirpath.evaluate(
    patient,
    `extension.where(url='${RACE_EXTENSION_URL}').extension.where(url='ombCategory').valueCoding.display`,
  ) as string[];

  return races;
}

export function getEthnicityDisplays(patient: Patient): string[] {
  const races = fhirpath.evaluate(
    patient,
    `extension.where(url='${ETHNICITY_EXTENSION_URL}').extension.where(url='ombCategory').valueCoding.display`,
  ) as string[];

  return races;
}

export function getGenderIdentityCode(patient: Patient): GenderCode | undefined {
  const [code] = fhirpath.evaluate(
    patient,
    `extension.where(url='${GENDER_IDENTITY_EXTENSION_URL}').valueCodeableConcept.coding.first().code`,
  ) as GenderCode[];

  return code;
}

export function getRaceCodes(patient: Patient): RaceCode[] {
  const races = fhirpath.evaluate(
    patient,
    `extension.where(url='${RACE_EXTENSION_URL}').extension.where(url='ombCategory').valueCoding.code`,
  ) as RaceCode[];

  return races;
}

export function getEthnicityCodes(patient: Patient): EthnicityCode[] {
  const races = fhirpath.evaluate(
    patient,
    `extension.where(url='${ETHNICITY_EXTENSION_URL}').extension.where(url='ombCategory').valueCoding.code`,
  ) as EthnicityCode[];

  return races;
}

export function getGenderIdentityDisplay(patient: Patient): GenderIdentity | undefined {
  const code = getGenderIdentityCode(patient);

  return code ? GENDER_CODE_TO_DISPLAY[code] : undefined;
}
