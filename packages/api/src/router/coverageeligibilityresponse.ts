import {
  CoverageEligibilityResponseSearchArgsSchema,
  type CoverageEligibilityResponseServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

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
          const trpcError = handleApiError(result.error);
          throw trpcError;
        }
        return result.value;
      }),
  });
};
