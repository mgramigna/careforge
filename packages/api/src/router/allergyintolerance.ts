import { z } from 'zod';

import {
  AllergyIntoleranceSchema,
  AllergyIntoleranceSearchArgsSchema,
  type AllergyIntoleranceServiceType,
} from '@careforge/canvas';

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
    update: authedProcedure
      .input(
        z.object({
          id: z.string(),
          resource: AllergyIntoleranceSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await allergyIntoleranceService.update({
          resource: {
            ...input.resource,
            id: input.id,
          },
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          // TODO
          return null;
        }

        return result.value;
      }),
    search: authedProcedure
      .input(AllergyIntoleranceSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await allergyIntoleranceService.search({
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
