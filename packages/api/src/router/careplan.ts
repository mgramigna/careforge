import { z } from 'zod';

import { CarePlanSearchArgsSchema, type CarePlanServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCarePlanRouter = ({
  carePlanService,
}: {
  carePlanService: CarePlanServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await carePlanService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    search: authedProcedure.input(CarePlanSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await carePlanService.search({
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
