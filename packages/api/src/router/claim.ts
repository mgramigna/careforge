import { ClaimSchema, type ClaimServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

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
          // TODO
          return null;
        }

        return result.value;
      }),
  });
};
