import { z } from 'zod';

import {
  CoverageSchema,
  CoverageSearchArgsSchema,
  type CoverageServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCoverageRouter = ({
  coverageService,
}: {
  coverageService: CoverageServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await coverageService.read({
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
      .input(CoverageSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await coverageService.create({
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
          resource: CoverageSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await coverageService.update({
          resource: {
            ...input.resource,
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
    search: authedProcedure.input(CoverageSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await coverageService.search({
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
