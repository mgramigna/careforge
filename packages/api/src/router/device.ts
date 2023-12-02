import { z } from 'zod';

import {
  DeviceSchema,
  DeviceSearchArgsSchema,
  type DeviceServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createDeviceRouter = ({ deviceService }: { deviceService: DeviceServiceType }) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await deviceService.read({
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
      .input(DeviceSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await deviceService.create({
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
          resource: DeviceSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await deviceService.update({
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
    search: authedProcedure.input(DeviceSearchArgsSchema).mutation(async ({ ctx, input }) => {
      const result = await deviceService.search({
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
