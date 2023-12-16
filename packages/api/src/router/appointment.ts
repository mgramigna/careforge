import { z } from 'zod';

import {
  AppointmentSchema,
  AppointmentSearchArgsSchema,
  type AppointmentServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createAppointmentRouter = ({
  appointmentService,
}: {
  appointmentService: AppointmentServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await appointmentService.read({
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
      .input(AppointmentSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await appointmentService.create({
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
          resource: AppointmentSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await appointmentService.update({
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
    search: authedProcedure.input(AppointmentSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await appointmentService.search({
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
