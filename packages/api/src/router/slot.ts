import { SlotSearchArgsSchema, type SlotServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

export const createSlotRouter = ({ slotService }: { slotService: SlotServiceType }) => {
  return createTRPCRouter({
    search: authedProcedure.input(SlotSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await slotService.search({
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
