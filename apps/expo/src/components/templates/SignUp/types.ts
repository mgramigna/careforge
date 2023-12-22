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
  phoneNumber: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Invalid phone number'),
});

export type BasicInfoFormType = z.infer<typeof BasicInfoFormSchema>;
