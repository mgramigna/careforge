import { z } from 'zod';

import {
  AllergenSchema,
  AllergenSearchArgsSchema,
  type AllergenServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createAllergenRouter = ({
  allergenService,
}: {
  allergenService: AllergenServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await allergenService.read({
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
      .input(AllergenSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await allergenService.create({
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
          resource: AllergenSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await allergenService.update({
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
    search: authedProcedure.input(AllergenSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await allergenService.search({
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
