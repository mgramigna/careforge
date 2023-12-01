import { z } from 'zod';

export const createDomainResourceSchema = (resourceType: string) => {
  return z.object({
    resourceType: z.literal(resourceType),
    id: z.string(),
  });
};
