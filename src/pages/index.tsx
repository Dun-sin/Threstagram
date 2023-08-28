// next/react
import { useEffect, useRef, useState } from 'react';

// libraries
import ColorPicker from 'react-pick-color';
import { InfinitySpin } from 'react-loader-spinner';

// components
import Social from '../components/Social';

// utils
import {
	extractPostID,
	extractUserName,
	elementToImage,
} from '../utils/helper';
import { getPostContent, getUserProfile } from '../utils/api';

export default function Home() {
	const [urlLoading, seturlLoading] = useState(false);
	const [contentLoading, setContentLoading] = useState(false);
	const [downloadLoading, setDownloadLoading] = useState(false);
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	const [error, setError] = useState('');
	const [postURL, setPostURL] = useState('');
	const [color, setColor] = useState('#ff4847');

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

		if (!(url.includes('threads.net') && url.includes('post'))) {
			setError('Invalid Link');
			return;
		}
		setError('');

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
		<section className='bg-primary text-secondary flex items-center flex-col justify-center h-screen w-screen gap-4 relative'>
			<Social />
			<h1 className='text-flg font-bold text-center'>
				Convert Your Threads Post To Instagram Carousel
			</h1>
			{/* Input */}
			<header className='w-full flex items-center justify-center flex-col relative'>
				<span className='w-4/5 max-w-[850px]'>
					<div className='flex items-center justify-center w-full'>
						<input
							type='text'
							placeholder='Threads Post URL'
							ref={urlRef}
							className='h-12 w-[80%] rounded-tl-md outline-none border-2 focus:border-brand px-4 text-primary'
						/>
						{urlLoading ? (
							<span className='w-[20%] bg-brand flex items-center justify-center h-12'>
								<InfinitySpin width='50' color='#ffff' />
							</span>
						) : (
							<button
								onClick={handleOnClick}
								className='bg-brand rounded-tr-md h-12 px-6 font-medium w-[20%]'>
								Submit
							</button>
						)}
					</div>
					<div className='w-full flex-wrap bg-secondary p-2 text-primary rounded-bl-md rounded-br-md flex gap-4 justify-center'>
						<span className='flex gap-2 items-center'>
							<p className='text-fxs'>Change Color: </p>
							<div
								className='h-8 w-8 rounded-md cursor-pointer'
								style={{ backgroundColor: color }}
								onClick={() => setIsPickerOpen(!isPickerOpen)}
							/>
							{isPickerOpen && (
								<ColorPicker
									color={color}
									onChange={(color) => setColor(color.hex)}
									className='absolute top-20 left-[30%]'
								/>
							)}
						</span>
					</div>
				</span>
				<p className='text-red-600 text-fsm text-center'>{error}</p>
			</header>

			{contentLoading ? (
				<span className='flex items-center justify-center w-4/5 max-w-[850px]'>
					<InfinitySpin width='150' color='#ffff' />
				</span>
			) : (
				// Display Content
				!(postContent.length === 0) && (
					<span className='w-4/5 flex flex-col justify-center items-center gap-2 h-auto max-w-[850px]'>
						<section
							className={`flex gap-4 w-full snap-x snap-mandatory overflow-x-scroll h-auto ${
								postContent.length === 1 && 'justify-center'
							}`}>
							{postContent.map((content: string, index: number) => (
								<div
									className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] flex justify-between flex-col rounded-md p-4 snap-center instagram-${index} overflow-y-scroll`}
									key={index}
									style={{ backgroundColor: color }}>
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
