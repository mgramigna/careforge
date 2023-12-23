import { ClaimSchema, type ClaimServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

export const createClaimRouter = ({ claimService }: { claimService: ClaimServiceType }) => {
  return createTRPCRouter({
    create: authedProcedure
      .input(ClaimSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await claimService.create({
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
