import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { InstantSchema } from '../core/instant';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const AppointmentSchema = createDomainResourceSchema('Appointment').extend({
  contained: z.array(
    createDomainResourceSchema('Endpoint').extend({
      status: z.enum(['active', 'suspended', 'error', 'off', 'entered-in-error']),
      connectionType: CodeableConceptSchema,
      payloadType: z.array(CodeableConceptSchema).optional(),
      address: z.string(),
    }),
  ),
  status: z.enum([
    'proposed',
    'pending',
    'booked',
    'arrived',
    'fulfilled',
    'cancelled',
    'noshow',
    'entered-in-error',
    'checked-in',
    'waitlist',
  ]),
  appointmentType: CodeableConceptSchema.optional(),
  reasonCode: z.array(CodeableConceptSchema).optional(),
  /**
   * @deprecated use `.reasonCode` instead
   */
  description: z.string().optional(),
  supportingInformation: z.array(ReferenceSchema).optional(),
  start: InstantSchema.optional(),
  end: InstantSchema.optional(),
  participant: z.array(
    z.object({
      type: z.array(CodeableConceptSchema).optional(),
      actor: ReferenceSchema.optional(),
      required: z.enum(['required', 'optional', 'information-only']).optional(),
      status: z.enum(['accepted', 'declined', 'tentative', 'needs-action']),
      period: PeriodSchema.optional(),
    }),
  ),
});

export const AppointmentSearchArgsSchema = z.object({
  _id: z.string().optional(),
  'appointment-type': z.string().optional(),
  location: z.string().optional(),
  patient: z.string().optional(),
  practitioner: z.string().optional(),
  date: z.string().optional(),
  _sort: z
    .enum(['date', 'patient', 'practitioner', '-date', '-patient', '-practitioner'])
    .optional(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
export type AppointmentSearchArgs = z.infer<typeof AppointmentSearchArgsSchema>;
