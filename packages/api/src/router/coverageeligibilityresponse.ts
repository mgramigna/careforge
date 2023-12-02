import {
  CoverageEligibilityResponseSearchArgsSchema,
  type CoverageEligibilityResponseServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCoverageEligibilityResponseRouter = ({
  coverageEligibilityResponseService,
}: {
  coverageEligibilityResponseService: CoverageEligibilityResponseServiceType;
}) => {
  return createTRPCRouter({
    search: authedProcedure
      .input(CoverageEligibilityResponseSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await coverageEligibilityResponseService.search({
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
