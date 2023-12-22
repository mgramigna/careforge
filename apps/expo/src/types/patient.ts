import { z } from 'zod';

export const RACE_EXTENSION_URL = 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race';
export const ETHNICITY_EXTENSION_URL =
  'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity';
export const GENDER_IDENTITY_EXTENSION_URL =
  'http://hl7.org/fhir/us/core/StructureDefinition/us-core-genderIdentity';

export const genderCodes = [
  '446151000124109',
  '446141000124107',
  '407377005',
  '407376001',
  '446131000124102',
  'ASKU',
  'OTH',
] as const;
export const GenderCodeSchema = z.enum(genderCodes);
export type GenderCode = z.infer<typeof GenderCodeSchema>;

export const genderIdentityOptions = [
  'Male',
  'Female',
  'Transgender Man',
  'Transgender Woman',
  'Non-conforming',
  'Other',
  'Choose not to disclose',
] as const;
export const GenderIdentitySchema = z.enum(genderIdentityOptions);
export type GenderIdentity = z.infer<typeof GenderIdentitySchema>;

// The default displays for these codes are not very user-friendly
// Handling it here instead
export const GENDER_CODE_TO_DISPLAY: Readonly<Record<GenderCode, GenderIdentity>> = {
  '446151000124109': 'Male',
  '446141000124107': 'Female',
  '407377005': 'Transgender Man',
  '407376001': 'Transgender Woman',
  '446131000124102': 'Non-conforming',
  ASKU: 'Choose not to disclose',
  OTH: 'Other',
} as const;

export const GENDER_DISPLAY_TO_CODE: Readonly<Record<GenderIdentity, GenderCode>> = {
  Male: '446151000124109',
  Female: '446141000124107',
  'Transgender Man': '407377005',
  'Transgender Woman': '407376001',
  'Non-conforming': '446131000124102',
  'Choose not to disclose': 'ASKU',
  Other: 'OTH',
} as const;

export const raceOptions = [
  'White',
  'Black or African American',
  'Asian',
  'American Indian or Alaska Native',
  'Native Hawaiian or Other Pacific Islander',
  'Other Race',
] as const;
export const RaceSchema = z.enum(raceOptions);
export type Race = z.infer<typeof RaceSchema>;

export const raceCodes = ['2028-9', '2106-3', '2131-1', '2054-5', '1002-5', '2076-8'] as const;
export const RaceCodeSchema = z.enum(raceCodes);
export type RaceCode = z.infer<typeof RaceCodeSchema>;

export const ethnicityOptions = ['Not Hispanic or Latino', 'Hispanic or Latino'] as const;
export const EthnicitySchema = z.enum(ethnicityOptions);
export type Ethnicity = z.infer<typeof EthnicitySchema>;

export const ethnicityCodes = ['2135-2', '2186-5'] as const;
export const EthnicityCodeSchema = z.enum(ethnicityCodes);
export type EthnicityCode = z.infer<typeof EthnicityCodeSchema>;

export const RACE_CODESYSTEM_URI = 'urn:oid:2.16.840.1.113883.6.238';
export const ETHNICITY_CODESYSTEM_URI = 'urn:oid:2.16.840.1.113883.6.238';

export const RACE_DISPLAY_TO_CODE: Readonly<Record<Race, RaceCode>> = {
  Asian: '2028-9',
  White: '2106-3',
  'Other Race': '2131-1',
  'Black or African American': '2054-5',
  'American Indian or Alaska Native': '1002-5',
  'Native Hawaiian or Other Pacific Islander': '2076-8',
} as const;

export const ETHNICITY_DISPLAY_TO_CODE: Readonly<Record<Ethnicity, EthnicityCode>> = {
  'Hispanic or Latino': '2135-2',
  'Not Hispanic or Latino': '2186-5',
} as const;
