import { z } from 'zod';

import { ProcedureSearchArgsSchema, type ProcedureServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createProcedureRouter = ({
  procedureService,
}: {
  procedureService: ProcedureServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await procedureService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    search: authedProcedure.input(ProcedureSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await procedureService.search({
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
