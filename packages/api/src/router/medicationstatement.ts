import { z } from 'zod';

import {
  MedicationStatementSchema,
  type MedicationStatementServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createMedicationStatementRouter = ({
  medicationStatementService,
}: {
  medicationStatementService: MedicationStatementServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await medicationStatementService.read({
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
      .input(MedicationStatementSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await medicationStatementService.create({
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
