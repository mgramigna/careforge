import { z } from 'zod';

import {
  DocumentReferenceSearchArgsSchema,
  type DocumentReferenceServiceType,
} from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

export const createDocumentReferenceRouter = ({
  documentReferenceService,
}: {
  documentReferenceService: DocumentReferenceServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await documentReferenceService.read({
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
      .input(DocumentReferenceSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await documentReferenceService.search({
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
