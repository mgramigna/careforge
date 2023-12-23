import { z } from 'zod';

import {
  CareTeamSchema,
  CareTeamSearchArgsSchema,
  type CareTeamServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

export const createCareTeamRouter = ({
  careTeamService,
}: {
  careTeamService: CareTeamServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await careTeamService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        const trpcError = handleApiError(result.error);
        throw trpcError;
      }
      return result.value;
    }),
    update: authedProcedure
      .input(
        z.object({
          id: z.string(),
          resource: CareTeamSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await careTeamService.update({
          resource: {
            ...input.resource,
            id: input.id,
          },
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          const trpcError = handleApiError(result.error);
          throw trpcError;
        }
        return result.value;
      }),
    search: authedProcedure.input(CareTeamSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await careTeamService.search({
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
