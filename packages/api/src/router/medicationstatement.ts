import { z } from 'zod';

import {
  MedicationStatementSchema,
  MedicationStatementSearchArgsSchema,
  type MedicationStatementServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

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
        const trpcError = handleApiError(result.error);
        throw trpcError;
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
          const trpcError = handleApiError(result.error);
          throw trpcError;
        }
        return result.value;
      }),
    update: authedProcedure
      .input(
        z.object({
          id: z.string(),
          resource: MedicationStatementSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await medicationStatementService.update({
          resource: {
            ...input.resource,
            id: input.id,
          },
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          const trpcError = handleApiError(result.error);
          throw trpcError;
        }
        return result.value;
      }),
    search: authedProcedure
      .input(MedicationStatementSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await medicationStatementService.search({
          args: input,
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          const trpcError = handleApiError(result.error);
          throw trpcError;
        }
        return result.value;
      }),
  });
};
