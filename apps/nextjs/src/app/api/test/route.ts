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

const handler = async () => {
  const { token, expiresInSeconds } = await getAuthToken({
    clientSecret: process.env.CANVAS_CLIENT_SECRET!,
    clientId: process.env.CANVAS_CLIENT_ID!,
    baseUrl: process.env.CANVAS_EMR_BASE_URL!,
  });

  return Response.json({
    token,
    expiresInSeconds,
  });
};

export { handler as GET, handler as POST };
