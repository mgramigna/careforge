import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { getAuthToken } from '@canvas-challenge/canvas';

const accessTokenCacheKey = 'FHIR_ACCESS_TOKEN';
const cache = new Map<string, string>();

interface CreateContextOptions {
  patientId?: string;
  accessToken?: string;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    patientId: opts.patientId,
    accessToken: opts.accessToken,
  };
};

// TODO
const TEST_PATIENT_ID = 'bf30c1ad56684713ac77cbfdb2764914';

export const createTRPCContext = async () => {
  // TODO: invalidate cache
  let token;
  if (cache.has(accessTokenCacheKey)) {
    console.log('getting token from cache');
    token = cache.get(accessTokenCacheKey);
  } else {
    console.log('sending auth token req');
    token = await getAuthToken({
      clientSecret: process.env.CANVAS_CLIENT_SECRET!,
      clientId: process.env.CANVAS_CLIENT_ID!,
      baseUrl: process.env.CANVAS_EMR_BASE_URL!,
    });

    cache.set(accessTokenCacheKey, token);
  }

  console.log({ token });

  return createInnerTRPCContext({
    // TODO
    patientId: TEST_PATIENT_ID,
    accessToken: token,
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
  if (!ctx.patientId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  if (!ctx.accessToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      patientId: ctx.patientId,
      accessToken: ctx.accessToken,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(enforceUserIsAuthed);
