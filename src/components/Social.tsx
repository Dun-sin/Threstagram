import { Icon } from '@iconify/react';

const Social = () => {
	return (
		<span className='flex gap-4 items-center absolute top-1 right-1'>
			<p className='text-fsm underline underline-offset-2 flex gap-2 items-center cursor-pointer'>
				<Icon icon='ri:github-fill' className='h-7 w-7' />
				Github
			</p>
			<a
				className='bg-yellow-400 px-5 py-3 flex gap-2 items-center rounded-md cursor-pointer'
				href='https://www.buymeacoffee.com/dunsinCodes'
				target='_blank'>
				<Icon icon='ep:coffee' className='h-7 w-7' />
				Buy Me A Coffee
			</a>
		</span>
	);
};

export default Social;
