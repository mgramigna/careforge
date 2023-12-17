import { z } from 'zod';

export const genderOptions = ['male', 'female', 'other', 'unknown'] as const;
export type Gender = (typeof genderOptions)[number];

export const BasicInfoFormSchema = z.object({
  firstName: z.string().min(1, {
    message: 'hello??',
  }),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
  dateOfBirth: z.date(),
  gender: z.enum(genderOptions),
});

export type BasicInfoFormType = z.infer<typeof BasicInfoFormSchema>;
