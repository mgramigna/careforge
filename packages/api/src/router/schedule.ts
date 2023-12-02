import { z } from 'zod';

import {
  ScheduleSchema,
  ScheduleSearchArgsSchema,
  type ScheduleServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createScheduleRouter = ({
  scheduleService,
}: {
  scheduleService: ScheduleServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await scheduleService.read({
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
      .input(ScheduleSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await scheduleService.create({
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
          resource: ScheduleSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await scheduleService.update({
          resource: {
            ...input,
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
    search: authedProcedure.input(ScheduleSearchArgsSchema).mutation(async ({ ctx, input }) => {
      const result = await scheduleService.search({
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
