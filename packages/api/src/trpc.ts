import { initTRPC, TRPCError } from '@trpc/server';
import { addSeconds } from 'date-fns';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { getAuthToken } from '@canvas-challenge/canvas';

const accessTokenCacheKey = 'FHIR_ACCESS_TOKEN';
const cache = new Map<string, { token: string; expiresInSeconds: number; created: Date }>();

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

const getNewAccessToken = async (): Promise<string> => {
  console.log('sending auth token req');
  const { token, expiresInSeconds } = await getAuthToken({
    clientSecret: process.env.CANVAS_CLIENT_SECRET!,
    clientId: process.env.CANVAS_CLIENT_ID!,
    baseUrl: process.env.CANVAS_EMR_BASE_URL!,
  });

  cache.set(accessTokenCacheKey, {
    token,
    expiresInSeconds,
    created: new Date(),
  });

  return token;
};

export const createTRPCContext = async () => {
  let token;
  if (cache.has(accessTokenCacheKey)) {
    console.log('getting token from cache');
    const entry = cache.get(accessTokenCacheKey)!;

    token = entry.token;

    const isExpired = addSeconds(entry.created, entry.expiresInSeconds) < new Date();

    if (isExpired) {
      token = await getNewAccessToken();
    }
  } else {
    token = await getNewAccessToken();
  }

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
