import { z } from 'zod';

import {
  AllergyIntoleranceSchema,
  type AllergyIntoleranceServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createAllergyIntoleranceRouter = ({
  allergyIntoleranceService,
}: {
  allergyIntoleranceService: AllergyIntoleranceServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await allergyIntoleranceService.read({
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
      .input(AllergyIntoleranceSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await allergyIntoleranceService.create({
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
