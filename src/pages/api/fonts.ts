import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const fontsPath = path.join(process.cwd(), 'public/assets/fonts'); // Adjust the path to your fonts folder
	try {
		const fonts = await fs.readdir(fontsPath);
		const fontOptions = fonts.map((font) => ({
			name: font.replace(/\..*$/, ''), // Remove file extension
			fontFamily: font.replace(/\..*$/, ''), // Use the font file name as fontFamily
			file: `/assets/fonts/${font}`, // Relative path to the font file
		}));
		res.status(200).json(fontOptions);
	} catch (error) {
		res.status(500).json({ error: 'Unable to load fonts.' });
	}
};
