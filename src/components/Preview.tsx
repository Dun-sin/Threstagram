import { useState } from 'react';

import { InfinitySpin } from 'react-loader-spinner';

import { elementToImage } from '../utils/helper';
import Image from 'next/image';

type User = {
	username: string;
	avatar: string;
};

type PreviewProps = {
	postContent: any[];
	color: string;
	postUser: User;
	fontFamily: string;
};

const Preview = (props: PreviewProps) => {
	const { postContent, color, postUser, fontFamily } = props;
	const [downloadLoading, setDownloadLoading] = useState(false);

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
		<span className='w-4/5 flex flex-col justify-center items-center gap-2 h-auto max-w-[850px]'>
			<section
				className={`flex gap-4 w-full snap-x snap-mandatory overflow-x-scroll h-auto ${
					postContent.length === 1 && 'justify-center'
				}`}>
				{postContent.map((content: string, index: number) => (
					<div
						className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] flex justify-between flex-col rounded-md p-4 snap-center instagram-${index} overflow-y-scroll`}
						key={index}
						style={{ backgroundColor: color, fontFamily }}>
						{postContent.length !== 1 && (
							<span className='text-fmd font-semibold border-b w-full border-secondary border-spacing-5 h-[10%]'>
								{index}
							</span>
						)}
						<span className={`text-f2xs h-[80%] flex items-center`}>
							{content}
						</span>
						<span className='flex gap-2 items-center border-t border-secondary border-spacing-5 h-[10%]'>
							<div className='h-8 w-8 rounded-full relative overflow-hidden border-2 border-secondary  border-spacing-6'>
								<Image
									src={postUser.avatar}
									alt={postUser.username}
									quality={100}
									fill
									className='object-cover'
								/>
							</div>
							<p className='text-fxs font-medium'>@{postUser.username}</p>
						</span>
					</div>
				))}
			</section>
			<button
				className='bg-brand rounded-md h-16 p-4 font-medium w-[270px] flex items-center justify-center'
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
	);
};

export default Preview;
