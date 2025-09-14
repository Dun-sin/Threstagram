import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/threads/callback`;
  const scope = 'threads_basic,threads_read_replies,threads_profile_discovery';

  const authUrl =
    `https://threads.net/oauth/authorize?` +
    `client_id=${process.env.THREADS_APP_ID}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${scope}&` +
    `response_type=code`;

  console.log({ authUrl });
  res.redirect(authUrl);
}
