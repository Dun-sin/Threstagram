import { NextApiRequest, NextApiResponse } from 'next';

import { ThreadsAPI } from 'threads-api';

const threadsAPI = new ThreadsAPI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('debugging production', req.method);
  if (req.method === 'GET') {
    const username = req.query.username as string;

    const userID = await threadsAPI.getUserIDfromUsername(username);
    if (!userID) {
      return;
    }
    const user = await threadsAPI.getUserProfile(userID);

    const url = user.profile_pic_url;
    const response = await fetch(url);

    const blob = await response.arrayBuffer();
    const contentType = response.headers.get('content-type');

    const base64String = `data:${contentType};base64,${Buffer.from(
      blob
    ).toString('base64')}`;

    res.status(200).json({ isSucess: true, message: base64String });
  } else {
    res
      .status(500)
      .json({ isSuccess: false, message: 'Internal Server Error' });
  }
}
