import { z } from 'zod';

import { ProvenanceSearchArgsSchema, type ProvenanceServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createProvenanceRouter = ({
  provenanceService,
}: {
  provenanceService: ProvenanceServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await provenanceService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    search: authedProcedure.input(ProvenanceSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await provenanceService.search({
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
