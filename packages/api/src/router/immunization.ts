import { z } from 'zod';

import {
  ImmunizationSchema,
  ImmunizationSearchArgsSchema,
  type ImmunizationServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createImmunizationRouter = ({
  immunizationService,
}: {
  immunizationService: ImmunizationServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await immunizationService.read({
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
      .input(ImmunizationSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await immunizationService.create({
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
          resource: ImmunizationSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await immunizationService.update({
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
    search: authedProcedure.input(ImmunizationSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await immunizationService.search({
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
