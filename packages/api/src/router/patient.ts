import { z } from 'zod';

import { PatientSchema, type PatientServiceType } from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createPatientRouter = ({ patientService }: { patientService: PatientServiceType }) => {
  return createTRPCRouter({
    me: authedProcedure.query(async ({ ctx }) => {
      const result = await patientService.read({
        id: ctx.patientId,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await patientService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    create: authedProcedure
      .input(PatientSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await patientService.create({
          resource: input,
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          // TODO
          return null;
        }

        return result.value;
      }),
  });
};
