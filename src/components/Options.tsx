import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';

import ColorPicker from 'react-pick-color';
import { InfinitySpin } from 'react-loader-spinner';

import { extractUserName } from '../utils/helper';
import { getUserProfile } from '../utils/api';

type User = {
	username: string;
	avatar: string;
};

type optionsType = {
	setPostURL: Dispatch<SetStateAction<string>>;
	setPostUser: Dispatch<SetStateAction<User>>;
	colorState: {
		color: string;
		setColor: Dispatch<SetStateAction<string>>;
	};
	postState: {
		posts: any[];
		setPostContent: Dispatch<SetStateAction<any[]>>;
	};
};

const Options = (props: optionsType) => {
	const { setPostURL, setPostUser, colorState, postState } = props;

	const [urlLoading, seturlLoading] = useState(false);
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	const [value, setValue] = useState(postState.posts.length);
	const [error, setError] = useState('');

	const urlRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		postState.setPostContent(postState.posts.slice(0, value));
	}, [value]);

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

	return (
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
							style={{ backgroundColor: colorState.color }}
							onClick={() => setIsPickerOpen(!isPickerOpen)}
						/>
						{isPickerOpen && (
							<ColorPicker
								color={colorState.color}
								onChange={(color) => colorState.setColor(color.hex)}
								className='absolute top-20 left-[30%]'
							/>
						)}
					</span>

					<span className='flex gap-2 items-center'>
						{postState.posts.length !== 0 && (
							<>
								<p>Number of Threads: </p>
								<div>
									<select
										className='border-none w-12 p-2 rounded-md border-brand border-2 cursor-pointer bg-secondary'
										defaultValue={postState.posts.length}
										onChange={(event) => setValue(Number(event.target.value))}>
										{numbers(postState.posts.length).map((value) => (
											<option value={value} key={value}>
												{value}
											</option>
										))}
									</select>
								</div>
							</>
						)}
					</span>
				</div>
			</span>
			<p className='text-red-600 text-fsm text-center'>{error}</p>
		</header>
	);
};

export default Options;

function numbers(postNumber: number) {
	const number = [];
	for (let index = 1; index < postNumber + 1; index++) {
		number.push(index);
	}

	return number;
}
