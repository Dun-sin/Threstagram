import { useEffect, useState } from 'react';

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
	const { postContent, color, postUser, fontFamily, setPostContent } = props;
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
					<PreviewCard hideMenubar={hideMenubar} key={`${postUser.username}-${index}`} content={content} index={index} color={color} fontFamily={fontFamily} postContent={postContent} postUser={postUser} setPostContent={setPostContent} />
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
