import { z } from 'zod';

import {
  MedicationRequestSearchArgsSchema,
  type MedicationRequestServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createMedicationRequestRouter = ({
  medicationRequestService,
}: {
  medicationRequestService: MedicationRequestServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await medicationRequestService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    search: authedProcedure
      .input(MedicationRequestSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await medicationRequestService.search({
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
