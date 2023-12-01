import { z } from 'zod';

const AuthTokenResponseBodySchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  scope: z.string(),
  smart_style_url: z.string(),
});

export async function getAuthToken({
  clientId,
  clientSecret,
  baseUrl,
}: {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}): Promise<{ token: string; expiresInSeconds: number }> {
  const response = await fetch(`${baseUrl}/auth/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const json = AuthTokenResponseBodySchema.parse(await response.json());

  return { token: json.access_token, expiresInSeconds: json.expires_in };
}
