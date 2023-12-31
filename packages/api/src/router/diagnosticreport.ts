import { z } from 'zod';

import {
  DiagnosticReportSearchArgsSchema,
  type DiagnosticReportServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

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
        const trpcError = handleApiError(result.error);
        throw trpcError;
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
          const trpcError = handleApiError(result.error);
          throw trpcError;
        }
        return result.value;
      }),
  });
};
