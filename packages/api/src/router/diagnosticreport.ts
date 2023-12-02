import { z } from 'zod';

import {
  DiagnosticReportSchema,
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
    create: authedProcedure
      .input(DiagnosticReportSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await diagnosticReportService.create({
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
          resource: DiagnosticReportSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await diagnosticReportService.update({
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
    search: authedProcedure
      .input(DiagnosticReportSearchArgsSchema)
      .mutation(async ({ ctx, input }) => {
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
