// next/react
import { useEffect, useState } from 'react';

// libraries
import { NextSeo } from 'next-seo';
import { InfinitySpin } from 'react-loader-spinner';

// components
import Social from '../components/Social';

// utils
import { extractPostID } from '../utils/helper';
import { getPostContent } from '../utils/api';
import Options from '../components/Options';
import Preview from '../components/Preview';

type User = {
	username: string;
	avatar: string;
};
export default function Home() {
	const [contentLoading, setContentLoading] = useState(false);

	const [error, setError] = useState('');
	const [postURL, setPostURL] = useState('');
	const [color, setColor] = useState<string>('#ff4847');
	const [fontFamily, setFontFamily] = useState('Exo2');

	const [postContent, setPostContent] = useState([]);
	const [postUser, setPostUser] = useState<User>({
		username: '',
		avatar: '',
	});

	useEffect(() => {
		if (postUser.username === '' && postURL === '') return;
		(async () => {
			setContentLoading(true);
			const id = extractPostID(postURL);
			const content = await getPostContent(id, postUser.username);

			setContentLoading(false);
			console.log(content.isSuccess);
			if (content.isSuccess) {
				setPostContent(content.message);
			} else {
				setError(content.message);
			}
		})();
	}, [postUser]);

	return (
		<>
			<NextSeo
				openGraph={{
					type: 'website',
					url: 'https://threstagram.vercel.app',
					title: 'Threstagram',
					description: 'Convert Your Threads Posts to Images',
					images: [
						{
							url: 'https://github-production-user-asset-6210df.s3.amazonaws.com/78784850/263960112-c1cb2dba-2379-4aa4-aba1-5ac124f7bcae.png',
							alt: 'Threstagram Alt',
							height: 600,
							width: 800,
						},
					],
				}}
			/>
			<section className='bg-primary text-secondary flex items-center flex-col justify-center h-screen w-screen gap-4 relative'>
				<Social />
				<h1 className='text-flg font-bold text-center'>
					Convert Your Threads Post To Instagram Carousel
				</h1>
				{/* Input */}
				<Options
					setPostURL={setPostURL}
					setPostUser={setPostUser}
					setFontFamily={setFontFamily}
					colorState={{ color, setColor }}
					postState={{ posts: postContent, setPostContent }}
					errorState={{ error, setError }}
				/>

				{contentLoading ? (
					<span className='flex items-center justify-center w-4/5 max-w-[850px]'>
						<InfinitySpin width='150' color='#ffff' />
					</span>
				) : (
					// Display Content
					!(postContent.length === 0) && (
						<Preview
							postContent={postContent}
							color={color}
							postUser={postUser}
							fontFamily={fontFamily}
						/>
					)
				)}
			</section>
		</>
	);
}
