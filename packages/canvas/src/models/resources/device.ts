import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const DeviceSchema = createDomainResourceSchema('Device').extend({
  udiCarrier: z
    .array(
      z.object({
        deviceIdentifier: z.string().optional(),
        issuer: z.string().optional(),
        jurisdiction: z.string().optional(),
        carrierAIDC: z.string().optional(),
        carrierHRF: z.string().optional(),
        entryType: z.enum(['barcode', 'rfid', 'manual']).optional(),
      }),
    )
    .optional(),
  status: z.enum(['active', 'inactive', 'entered-in-error', 'unknown']),
  distinctIdentifier: z.string().optional(),
  manufacturer: z.string().optional(),
  manufactureDate: DateTimeSchema.optional(),
  expirationDate: DateTimeSchema.optional(),
  lotNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  modelNumber: z.string().optional(),
  type: CodeableConceptSchema.optional(),
  patient: ReferenceSchema.optional(),
});

export type Device = z.infer<typeof DeviceSchema>;
