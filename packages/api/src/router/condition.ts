import { z } from 'zod';

import {
  ConditionSchema,
  ConditionSearchArgsSchema,
  type ConditionServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

export const createConditionRouter = ({
  conditionService,
}: {
  conditionService: ConditionServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await conditionService.read({
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
      .input(ConditionSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await conditionService.create({
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
          resource: ConditionSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await conditionService.update({
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
    search: authedProcedure.input(ConditionSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await conditionService.search({
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
