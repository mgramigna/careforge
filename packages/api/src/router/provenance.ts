import { z } from 'zod';

import {
  ProvenanceSchema,
  ProvenanceSearchArgsSchema,
  type ProvenanceServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createProvenanceRouter = ({
  provenanceService,
}: {
  provenanceService: ProvenanceServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await provenanceService.read({
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
      .input(ProvenanceSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await provenanceService.create({
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
          resource: ProvenanceSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await provenanceService.update({
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
    search: authedProcedure.input(ProvenanceSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await provenanceService.search({
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
