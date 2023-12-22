import { type NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import dayjs from 'dayjs';

import { appRouter, createTRPCContext } from '@careforge/api';
import { getAuthToken } from '@careforge/canvas';

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

    const isExpired = dayjs(entry.created).add(entry.expiresInSeconds, 'seconds') < dayjs();

    if (isExpired) {
      token = await getNewAccessToken();
    }
  } else {
    token = await getNewAccessToken();
  }

  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
