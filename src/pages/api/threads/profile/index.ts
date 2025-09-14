import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({
          isSuccess: false,
          message: 'Access token required',
        });
      }

      // Get user profile
      const profileResponse = await axios.get(
        'https://graph.threads.net/v1.0/me',
        {
          params: {
            fields: 'id,username,name,threads_profile_picture_url',
            access_token: token,
          },
        }
      );

      res.json({
        isSuccess: true,
        profile: profileResponse.data,
      });
    } else {
      res.status(405).json({
        isSuccess: false,
        message: 'Method not allowed',
      });
    }
  } catch (error: any) {
    console.error('Profile API Error:', error);

    if (error.response?.status === 401) {
      res.status(401).json({
        isSuccess: false,
        message: 'Invalid or expired access token',
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        message: 'Failed to fetch profile',
        details: error.response?.data || error.message,
      });
    }
  }
}
