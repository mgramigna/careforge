import { z } from 'zod';

import {
  CoverageEligibilityRequestSchema,
  CoverageEligibilityRequestSearchArgsSchema,
  type CoverageEligibilityRequestServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCoverageEligibilityRequestRouter = ({
  coverageEligibilityRequestService,
}: {
  coverageEligibilityRequestService: CoverageEligibilityRequestServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await coverageEligibilityRequestService.read({
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
      .input(CoverageEligibilityRequestSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await coverageEligibilityRequestService.create({
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
          resource: CoverageEligibilityRequestSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await coverageEligibilityRequestService.update({
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
    search: authedProcedure
      .input(CoverageEligibilityRequestSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await coverageEligibilityRequestService.search({
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
