import { z } from 'zod';

import {
  PractitionerSchema,
  PractitionerSearchArgsSchema,
  type PractitionerServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createPractitionerRouter = ({
  practitionerService,
}: {
  practitionerService: PractitionerServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await practitionerService.read({
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
      .input(PractitionerSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await practitionerService.create({
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
          resource: PractitionerSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await practitionerService.update({
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
    search: authedProcedure.input(PractitionerSearchArgsSchema).mutation(async ({ ctx, input }) => {
      const result = await practitionerService.search({
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
