import { z } from 'zod';

import {
  CoverageEligibilityResponseSchema,
  type CoverageEligibilityResponseServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCoverageEligibilityResponseRouter = ({
  coverageEligibilityResponseService,
}: {
  coverageEligibilityResponseService: CoverageEligibilityResponseServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await coverageEligibilityResponseService.read({
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
      .input(CoverageEligibilityResponseSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await coverageEligibilityResponseService.create({
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
