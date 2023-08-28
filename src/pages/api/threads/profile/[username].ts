import { NextApiRequest, NextApiResponse } from 'next';

import { ThreadsAPI } from 'threads-api';

const threadsAPI = new ThreadsAPI();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		const username = req.query.username as string;

		const userID = await threadsAPI.getUserIDfromUsername(username);
		if (!userID) {
			return;
		}
		const user = await threadsAPI.getUserProfile(userID);
		res.status(200).json({ isSucess: true, message: user.profile_pic_url });
	} else {
		res
			.status(500)
			.json({ isSuccess: false, message: 'Internal Server Error' });
	}
}
