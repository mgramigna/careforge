import { z } from 'zod';

import { ConsentSchema, ConsentSearchArgsSchema, type ConsentServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

export const createConsentRouter = ({ consentService }: { consentService: ConsentServiceType }) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await consentService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        const trpcError = handleApiError(result.error);
        throw trpcError;
      }
      return result.value;
    }),
    create: authedProcedure
      .input(ConsentSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await consentService.create({
          resource: input,
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          const trpcError = handleApiError(result.error);
          throw trpcError;
        }
        return result.value;
      }),
    search: authedProcedure.input(ConsentSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await consentService.search({
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
