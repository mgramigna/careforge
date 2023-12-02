import { z } from 'zod';

import {
  EncounterSchema,
  EncounterSearchArgsSchema,
  type EncounterServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createEncounterRouter = ({
  encounterService,
}: {
  encounterService: EncounterServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await encounterService.read({
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
      .input(EncounterSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await encounterService.create({
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
          resource: EncounterSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await encounterService.update({
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
    search: authedProcedure.input(EncounterSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await encounterService.search({
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
