import { z } from 'zod';

import {
  CareTeamSchema,
  CareTeamSearchArgsSchema,
  type CareTeamServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCareTeamRouter = ({
  careTeamService,
}: {
  careTeamService: CareTeamServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await careTeamService.read({
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
      .input(CareTeamSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await careTeamService.create({
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
          resource: CareTeamSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await careTeamService.update({
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
    search: authedProcedure.input(CareTeamSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await careTeamService.search({
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
