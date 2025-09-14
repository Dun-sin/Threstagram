import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://graph.threads.net/oauth/access_token',
      {
        client_id: process.env.THREADS_APP_ID,
        client_secret: process.env.THREADS_APP_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/threads/callback`,
        code: code,
      }
    );

    const { access_token } = tokenResponse.data;

    // Get long-lived token
    const longLivedResponse = await axios.get(
      'https://graph.threads.net/access_token',
      {
        params: {
          grant_type: 'th_exchange_token',
          client_secret: process.env.THREADS_APP_SECRET,
          access_token: access_token,
        },
      }
    );

    const { access_token: longLivedToken, expires_in } = longLivedResponse.data;

    // Redirect to frontend with token (you'll handle storage there)
    const redirectUrl = `/threads/?token=${longLivedToken}&expires=${expires_in}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Token exchange failed:', error.response?.data || error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
}
