import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className='underline underline-offset-4 text-fsm'
    >{`<- Back`}</button>
  );
};

export default BackButton;
