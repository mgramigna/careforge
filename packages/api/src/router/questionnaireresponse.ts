import { z } from 'zod';

import {
  QuestionnaireResponseSchema,
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
  });
};
