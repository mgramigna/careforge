import { z } from 'zod';

import { PatientSchema, PatientSearchArgsSchema, type PatientServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createPatientRouter = ({ patientService }: { patientService: PatientServiceType }) => {
  return createTRPCRouter({
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
      .input(PatientSchema.omit({ id: true, identifier: true }))
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
    update: authedProcedure
      .input(
        z.object({
          id: z.string(),
          resource: PatientSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await patientService.update({
          resource: {
            ...input,
            id: input.id,
          },
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          // TODO
          return null;
        }

        return result.value;
      }),
    search: authedProcedure.input(PatientSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await patientService.search({
        args: input,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        console.error(result.error);
        return null;
      }

      return result.value;
    }),
  });
};
