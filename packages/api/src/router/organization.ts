import { z } from 'zod';

import {
  OrganizationSchema,
  OrganizationSearchArgsSchema,
  type OrganizationServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createOrganizationRouter = ({
  organizationService,
}: {
  organizationService: OrganizationServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await organizationService.read({
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
      .input(OrganizationSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await organizationService.create({
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
          resource: OrganizationSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await organizationService.update({
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
    search: authedProcedure.input(OrganizationSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await organizationService.search({
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
