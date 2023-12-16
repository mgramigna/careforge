import { z } from 'zod';

import {
  ObservationSchema,
  ObservationSearchArgsSchema,
  type ObservationServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createObservationRouter = ({
  observationService,
}: {
  observationService: ObservationServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await observationService.read({
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
      .input(ObservationSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await observationService.create({
          resource: input,
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          // TODO
          return null;
        }

        return result.value;
      }),
    search: authedProcedure.input(ObservationSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await observationService.search({
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
