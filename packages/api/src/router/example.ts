import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .query(({ input }) => {
      return `Hello, ${input.message}`;
    }),
});
