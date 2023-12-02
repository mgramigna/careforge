import { z } from 'zod';

import {
  MediaSchema,
  MediaSearchArgsSchema,
  type MediaServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createMediaRouter = ({ mediaService }: { mediaService: MediaServiceType }) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await mediaService.read({
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
      .input(MediaSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await mediaService.create({
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
          resource: MediaSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await mediaService.update({
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
    search: authedProcedure.input(MediaSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await mediaService.search({
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
