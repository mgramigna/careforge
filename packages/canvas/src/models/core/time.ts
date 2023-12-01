import { z } from 'zod';

export const TimeSchema = z
  .string()
  .regex(/([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/);
