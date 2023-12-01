import { z } from 'zod';

import { QuestionnaireSchema, type QuestionnaireServiceType } from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createQuestionnaireRouter = ({
  questionnaireService,
}: {
  questionnaireService: QuestionnaireServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await questionnaireService.read({
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
      .input(QuestionnaireSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await questionnaireService.create({
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
