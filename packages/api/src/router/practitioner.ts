import { z } from 'zod';

import {
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
    search: authedProcedure.input(PractitionerSearchArgsSchema).query(async ({ ctx, input }) => {
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
