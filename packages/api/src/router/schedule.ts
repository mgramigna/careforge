import { type ScheduleServiceType } from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createScheduleRouter = ({
  scheduleService,
}: {
  scheduleService: ScheduleServiceType;
}) => {
  return createTRPCRouter({
    search: authedProcedure.query(async ({ ctx }) => {
      const result = await scheduleService.search({
        args: {},
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
