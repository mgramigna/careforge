import { z } from 'zod';

import {
  DocumentReferenceSchema,
  type DocumentReferenceServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

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
        // TODO
        return null;
      }

      return result.value;
    }),
    create: authedProcedure
      .input(DocumentReferenceSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await documentReferenceService.create({
          resource: input,
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
