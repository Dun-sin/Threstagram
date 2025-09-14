import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token, id } = req.query;

    if (!token) {
      return res.status(400).json('Access token required');
    }

    const response = await axios.get(
      `https://graph.threads.net/v1.0/${id}/threads`,
      {
        params: {
          access_token: token,
          fields: 'id,text,is_quote_post',
          since: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000), // 7 days ago (in seconds)
          until: Math.floor(Date.now() / 1000), // now (in seconds)
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data);
    }
    res.status(200).json(response.data.data);
  } catch (error) {
    console.error('Posts API Error:', error);
    res.status(500).json(error.response?.data || error.message);
  }
}
