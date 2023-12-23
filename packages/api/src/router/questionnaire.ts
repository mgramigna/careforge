import { z } from 'zod';

import { QuestionnaireSearchArgsSchema, type QuestionnaireServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

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
        const trpcError = handleApiError(result.error);
        throw trpcError;
      }
      return result.value;
    }),
    search: authedProcedure.input(QuestionnaireSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await questionnaireService.search({
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
