import { z } from 'zod';

import {
  MedicationSchema,
  MedicationSearchArgsSchema,
  type MedicationServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createMedicationRouter = ({
  medicationService,
}: {
  medicationService: MedicationServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await medicationService.read({
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
      .input(MedicationSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await medicationService.create({
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
          resource: MedicationSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await medicationService.update({
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
    search: authedProcedure.input(MedicationSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await medicationService.search({
        args: input,
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
