import { useEffect, useRef, useState } from 'react';

import { InfinitySpin } from 'react-loader-spinner';

import {
	extractPostID,
	extractUserName,
	extractImageUrl,
	elementToImage,
} from '../utils/helper';

import { getPostContent, getUserProfile } from '../utils/api';

export default function Home() {
	const [urlLoading, seturlLoading] = useState(false);
	const [contentLoading, setContentLoading] = useState(false);
	const [downloadLoading, setDownloadLoading] = useState(false);

	const [postURL, setPostURL] = useState('');
	const [postContent, setPostContent] = useState([]);
	const [postUser, setPostUser] = useState({
		username: '',
		avatar: '',
	});

	const urlRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (postUser.username === '' && postURL === '') return;
		(async () => {
			setContentLoading(true);
			const id = extractPostID(postURL);
			const content = await getPostContent(id, postUser.username);

			setContentLoading(false);
			setPostContent(content);
		})();
	}, [postUser]);

	const handleOnClick = async () => {
		if (urlRef.current === null) return;
		const url = urlRef.current.value;
		urlRef.current.value = '';

		if (!(url.includes('threads.net') && url.includes('post'))) return;
		seturlLoading(true);
		setPostURL(url);

		const username = extractUserName(url);
		const avatar = await getUserProfile(username);

		setPostUser({ username, avatar });
		seturlLoading(false);
	};

	const handleDownload = async () => {
		if (postContent.length === 0) return;
		setDownloadLoading(true);

		const data = await elementToImage(postContent.length);

		data.forEach((url: string, index: number) => {
			const link = document.createElement('a');
			link.download = `instagram-${index}.png`;
			link.href = url;
			link.click();
		});

		setDownloadLoading(false);
	};

	return (
		<section className='bg-primary text-secondary flex items-center flex-col justify-center h-screen w-screen gap-10 relative'>
			<h1 className='text-flg font-bold'>
				Convert Your Threads Post To Instagram Carousel
			</h1>
			<span className='w-4/5 flex items-center justify-center'>
				<input
					type='text'
					placeholder='Threads Post URL'
					ref={urlRef}
					className='h-12 w-[80%] rounded-tl-md rounded-bl-md outline-none border-2 focus:border-brand px-4 text-primary'
				/>
				{urlLoading ? (
					<InfinitySpin width='50' color='#ffff' />
				) : (
					<button
						onClick={handleOnClick}
						className='bg-brand rounded-tr-md rounded-br-md h-12 px-6 font-medium w-[20%]'>
						Submit
					</button>
				)}
			</span>

			{contentLoading ? (
				<span className='flex items-center justify-center w-4/5'>
					<InfinitySpin width='150' color='#ffff' />
				</span>
			) : (
				!(postContent.length === 0) && (
					<span className='w-full flex flex-col justify-center items-center gap-6'>
						<section
							className={`flex gap-4 w-4/5 snap-x snap-mandatory overflow-x-scroll ${
								postContent.length === 1 && 'justify-center'
							}`}>
							{postContent.map((content: string, index: number) => (
								<div
									className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] bg-brand flex justify-between flex-col rounded-md p-4 snap-center instagram-${index}`}
									key={index}>
									{postContent.length !== 1 && (
										<span className='text-fmd font-semibold border-b w-full border-secondary border-spacing-5 h-[10%]'>
											{index}
										</span>
									)}
									<span className={`text-lg h-[80%] flex items-center`}>
										{content}
									</span>
									<span className='flex gap-6 border-t border-secondary border-spacing-5 h-[10%]'>
										{/* <img
								src={extractImageUrl(postUser.avatar)}
								alt={postUser.username}
								className='h-6 w-6 rounded-full'
							/> */}
										<p className='text-fsm font-semibold'>
											@{postUser.username}
										</p>
									</span>
								</div>
							))}
						</section>
						<button
							className='bg-brand rounded-md h-16 p-4 font-medium w-60 flex items-center justify-center'
							onClick={handleDownload}>
							{downloadLoading ? (
								<span className='flex items-center justify-center w-full'>
									<InfinitySpin width='100' color='#ffff' />
								</span>
							) : (
								<>Download</>
							)}
						</button>
					</span>
				)
			)}
		</section>
	);
}
