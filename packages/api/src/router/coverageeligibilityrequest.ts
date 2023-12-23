import {
  CoverageEligibilityRequestSchema,
  type CoverageEligibilityRequestServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

export const createCoverageEligibilityRequestRouter = ({
  coverageEligibilityRequestService,
}: {
  coverageEligibilityRequestService: CoverageEligibilityRequestServiceType;
}) => {
  return createTRPCRouter({
    create: authedProcedure
      .input(CoverageEligibilityRequestSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await coverageEligibilityRequestService.create({
          resource: input,
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
