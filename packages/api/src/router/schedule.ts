import { type ScheduleServiceType } from '@careforge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';
import { handleApiError } from '../util/errors';

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
        const trpcError = handleApiError(result.error);
        throw trpcError;
      }
      return result.value;
    }),
  });
};
