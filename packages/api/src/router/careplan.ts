import { z } from 'zod';

import {
  CarePlanSchema,
  CarePlanSearchArgsSchema,
  type CarePlanServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCarePlanRouter = ({
  carePlanService,
}: {
  carePlanService: CarePlanServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await carePlanService.read({
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
      .input(CarePlanSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await carePlanService.create({
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
          resource: CarePlanSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await carePlanService.update({
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
    search: authedProcedure.input(CarePlanSearchArgsSchema).mutation(async ({ ctx, input }) => {
      const result = await carePlanService.search({
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
