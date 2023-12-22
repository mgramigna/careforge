import { z } from 'zod';

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
export type GenderCode = (typeof genderCodes)[number];

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
export type GenderIdentity = (typeof genderIdentityOptions)[number];

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
