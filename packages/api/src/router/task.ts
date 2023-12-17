import { z } from 'zod';

import { TaskSchema, TaskSearchArgsSchema, type TaskServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createTaskRouter = ({ taskService }: { taskService: TaskServiceType }) => {
  return createTRPCRouter({
    create: authedProcedure
      .input(TaskSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await taskService.create({
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
          resource: TaskSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await taskService.update({
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
    search: authedProcedure.input(TaskSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await taskService.search({
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
