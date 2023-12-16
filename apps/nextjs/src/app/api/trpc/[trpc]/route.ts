import { type NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { addSeconds } from 'date-fns';

import { appRouter, createTRPCContext } from '@canvas-challenge/api';
import { getAuthToken } from '@canvas-challenge/canvas';

function setCorsHeaders(res: Response) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Request-Method', '*');
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.headers.set('Access-Control-Allow-Headers', '*');
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const accessTokenCacheKey = 'FHIR_ACCESS_TOKEN';
const cache = new Map<string, { token: string; expiresInSeconds: number; created: Date }>();

const getNewAccessToken = async (): Promise<string> => {
  console.log('[handler] fetching new auth token');
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

const handler = async (req: NextRequest) => {
  let token: string;
  if (cache.has(accessTokenCacheKey)) {
    console.log('[handler] getting token from cache');
    const entry = cache.get(accessTokenCacheKey)!;

    token = entry.token;

    const isExpired = addSeconds(entry.created, entry.expiresInSeconds) < new Date();

    if (isExpired) {
      token = await getNewAccessToken();
    }
  } else {
    token = await getNewAccessToken();
  }

  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    // @ts-expect-error router types get mad
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext({
        accessToken: token,
      }),
    onError({ error, path }) {
      console.error(`[handler] trpc Error on '${path}'`, error);
    },
  });

  setCorsHeaders(response);
  return response;
};

export { handler as GET, handler as POST };
