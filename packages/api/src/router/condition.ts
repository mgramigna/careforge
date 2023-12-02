import { z } from 'zod';

import {
  ConditionSchema,
  ConditionSearchArgsSchema,
  type ConditionServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

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
        // TODO
        return null;
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
          // TODO
          return null;
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
    search: authedProcedure.input(ConditionSearchArgsSchema).mutation(async ({ ctx, input }) => {
      const result = await conditionService.search({
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
