import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

interface CreateContextOptions {
  accessToken?: string;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    accessToken: opts.accessToken,
  };
};

export const createTRPCContext = (opts: CreateContextOptions) => {
  return createInnerTRPCContext({
    ...opts,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.accessToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      accessToken: ctx.accessToken,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(enforceUserIsAuthed);
