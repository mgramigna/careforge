import { SlotSearchArgsSchema, type SlotServiceType } from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createSlotRouter = ({ slotService }: { slotService: SlotServiceType }) => {
  return createTRPCRouter({
    search: authedProcedure.input(SlotSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await slotService.search({
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
