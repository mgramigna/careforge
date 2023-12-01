import { z } from 'zod';

import { PaymentNoticeSchema, type PaymentNoticeServiceType } from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const createPaymentNoticeRouter = ({
  paymentNoticeService,
}: {
  paymentNoticeService: PaymentNoticeServiceType;
}) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await paymentNoticeService.read({
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
      .input(PaymentNoticeSchema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await paymentNoticeService.create({
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
