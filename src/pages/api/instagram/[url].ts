import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '310c53f9d7mshd5996ffe9c955d7p1173cdjsn2e9229dd57fc',
    'X-RapidAPI-Host': 'instagram-bulk-scraper-latest.p.rapidapi.com',
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      getImage(req, res);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query.url;

  options[
    'url'
  ] = `https://instagram-bulk-scraper-latest.p.rapidapi.com/media_download_by_shortcode/${url}`;

  const response = await axios.request(options);
  const data = response.data;

  const baseURL = await getBaseImageUrl(data.data.child_medias_hd);

  return res.status(200).json({ data: baseURL });
};

const getBaseImageUrl = async (imageUrl: { url: string; type: string }[]) => {
  const base = [];

  for (const { url } of imageUrl) {
    const response = await fetch(url);

    const blob = await response.arrayBuffer();
    const contentType = response.headers.get('content-type');

    const base64String = `data:${contentType};base64,${Buffer.from(
      blob
    ).toString('base64')}`;

    base.push(base64String);
  }

  return base; // Return the base array with base64 strings
};
