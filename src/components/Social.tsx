import { Icon } from '@iconify/react';

const Social = () => {
  return (
    <div className='flex gap-4 items-center px-4'>
      <a
        className='text-fsm underline underline-offset-2 flex gap-2 items-center cursor-pointer'
        href='https://github.com/dun-sin/Threstagram'
        target='_blank'
      >
        <Icon icon='ri:github-fill' className='h-7 w-7' />
      </a>
      <a
        className='bg-yellow-400 px-4 py-2 flex gap-2 items-center rounded-md cursor-pointer'
        href='https://www.buymeacoffee.com/dunsinCodes'
        target='_blank'
      >
        <Icon icon='ep:coffee' className='h-7 w-7' />
        Buy Me A Coffee
      </a>
    </div>
  );
};

export default Social;
