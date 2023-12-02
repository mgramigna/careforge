import { ScheduleSearchArgsSchema, type ScheduleServiceType } from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createScheduleRouter = ({
  scheduleService,
}: {
  scheduleService: ScheduleServiceType;
}) => {
  return createTRPCRouter({
    search: authedProcedure.input(ScheduleSearchArgsSchema).query(async ({ ctx, input }) => {
      const result = await scheduleService.search({
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
