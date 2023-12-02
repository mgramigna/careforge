import { z } from 'zod';

import {
  MedicationRequestSchema,
  MedicationRequestSearchArgsSchema,
  type MedicationRequestServiceType,
} from '@canvas-challenge/canvas';

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
    create: authedProcedure
      .input(MedicationRequestSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await medicationRequestService.create({
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
          resource: MedicationRequestSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await medicationRequestService.update({
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
    search: authedProcedure
      .input(MedicationRequestSearchArgsSchema)
      .mutation(async ({ ctx, input }) => {
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
