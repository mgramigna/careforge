import { z } from 'zod';

import {
  ProcedureSchema,
  ProcedureSearchArgsSchema,
  type ProcedureServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createProcedureRouter = ({
  procedureService,
}: {
  procedureService: ProcedureServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await procedureService.read({
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
      .input(ProcedureSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await procedureService.create({
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
          resource: ProcedureSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await procedureService.update({
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
    search: authedProcedure.input(ProcedureSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await procedureService.search({
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
