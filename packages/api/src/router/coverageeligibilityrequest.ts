import { z } from 'zod';

import {
  CoverageEligibilityRequestSchema,
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
  });
};
