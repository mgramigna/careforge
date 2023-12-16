import { z } from 'zod';

import { MedicationSearchArgsSchema, type MedicationServiceType } from '@careforge/canvas';

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
