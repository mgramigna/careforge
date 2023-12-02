import { z } from 'zod';

import {
  QuestionnaireResponseSchema,
  QuestionnaireResponseSearchArgsSchema,
  type QuestionnaireResponseServiceType,
} from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createQuestionnaireResponseRouter = ({
  questionnaireResponseService,
}: {
  questionnaireResponseService: QuestionnaireResponseServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await questionnaireResponseService.read({
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
      .input(QuestionnaireResponseSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await questionnaireResponseService.create({
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
          resource: QuestionnaireResponseSchema.partial(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const result = await questionnaireResponseService.update({
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
      .input(QuestionnaireResponseSearchArgsSchema)
      .query(async ({ ctx, input }) => {
        const result = await questionnaireResponseService.search({
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
