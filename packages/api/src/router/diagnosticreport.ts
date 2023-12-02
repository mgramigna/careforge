import { z } from 'zod';

import {
  DiagnosticReportSearchArgsSchema,
  type DiagnosticReportServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createDiagnosticReportRouter = ({
  diagnosticReportService,
}: {
  diagnosticReportService: DiagnosticReportServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await diagnosticReportService.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    search: authedProcedure
      .input(DiagnosticReportSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await diagnosticReportService.search({
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
