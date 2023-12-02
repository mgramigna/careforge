import { z } from 'zod';

import {
  CommunicationSchema,
  CommunicationSearchArgsSchema,
  type CommunicationServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createCommunicationRouter = ({
  communicationService,
}: {
  communicationService: CommunicationServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await communicationService.read({
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
      .input(CommunicationSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await communicationService.create({
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
          resource: CommunicationSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await communicationService.update({
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
    search: authedProcedure.input(CommunicationSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await communicationService.search({
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
