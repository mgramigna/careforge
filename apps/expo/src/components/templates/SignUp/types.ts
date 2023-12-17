import { z } from 'zod';

export const BasicInfoFormSchema = z.object({
  firstName: z.string().min(1, {
    message: 'hello??',
  }),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
  dateOfBirth: z.date(),
});

export type BasicInfoFormType = z.infer<typeof BasicInfoFormSchema>;

export const genderOptions = ['male', 'female', 'other', 'unknown'] as const;

export const DemographicsFormSchema = z.object({
  gender: z.enum(genderOptions),
});

export type DemographicsFormType = z.infer<typeof DemographicsFormSchema>;
