/* eslint-disable import/order */
// next/react
import React, { useEffect, useState } from 'react';

// libraries
import { NextSeo } from 'next-seo';
import { InfinitySpin } from 'react-loader-spinner';

// components
import Options from '../components/Options';
import Preview from '../components/Preview';
import Social from '../components/Social';

// utils
import { getPostContent } from '../utils/api';
import { extractPostID } from '../utils/helper';
import { type User } from '../utils/types';
export default function Home() {
	const [contentLoading, setContentLoading] = useState(false);

	const [error, setError] = useState('');
	const [postURL, setPostURL] = useState('');
	const [color, setColor] = useState<string>('#ff4847');
	const [fontFamily, setFontFamily] = useState('Exo2');

	const [postContent, setPostContent] = useState<string[]>([]);
	const [postUser, setPostUser] = useState<User>({
		username: '',
		avatar: '',
	});

	useEffect(() => {
		if (postUser.username === '' && postURL === '') return;
		void (async () => {
			setContentLoading(true);
			const id = extractPostID(postURL);
			const content = await getPostContent(id, postUser.username);

			setContentLoading(false);
			if ('isSuccess' in content) {
				if (content.isSuccess && typeof content.message !== 'string') {
					setPostContent(content.message);
				} else {
					setError(content.message as string);
				}
			} else {
				setError('An error occurred while fetching the post content.');
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
							setPostContent={setPostContent}
						/>
					)
				)}
			</section>
		</>
	);
}
