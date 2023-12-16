import { z } from 'zod';

import { ImmunizationSearchArgsSchema, type ImmunizationServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createImmunizationRouter = ({
  immunizationService,
}: {
  immunizationService: ImmunizationServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await immunizationService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    search: authedProcedure.input(ImmunizationSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await immunizationService.search({
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
