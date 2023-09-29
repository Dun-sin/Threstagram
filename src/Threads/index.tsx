// next/react
import { useEffect, useState } from 'react';

// libraries
import { PongSpinner } from 'react-spinners-kit';

// components
import Social from '../components/Social';
import Options from './component/Options';
import Preview from './component/Preview';
import BackButton from '../components/Button/BackButton';

// utils
import { extractPostID } from '../utils/helper';
import { getPostContent } from '../utils/api';

// context
import { useUser } from './context/UserContext';
import { useContent } from './context/ContentContext';

export default function Threads() {
  const { contentState, dispatchContent } = useContent();
  const { userState } = useUser();

  const [postURL, setPostURL] = useState('');

  useEffect(() => {
    if (userState.username === '' && postURL === '') return;
    (async () => {
      dispatchContent({ type: 'START_LOADING', payload: true });
      const id = extractPostID(postURL);
      const content = await getPostContent(id, userState.username);

      if (content.isSuccess) {
        dispatchContent({ type: 'SET_CONTENT', payload: content.message });
      } else {
        dispatchContent({ type: 'START_LOADING', payload: false });
        dispatchContent({ type: 'SET_ERROR', payload: content.message });
      }
    })();
  }, [userState]);

  return (
    <section className='bg-primary text-secondary flex items-center flex-col justify-between h-screen w-screen font-sans sm:gap-0 gap-12 relative'>
      <div
        className='absolute h-screen w-screen bg-repeat-x'
        style={{
          backgroundImage:
            "url('https://e0.pxfuel.com/wallpapers/487/755/desktop-wallpaper-black-and-blue-black-blue-backgrounds-new.jpg')",
        }}
      />

      <header className='flex items-center justify-between w-full bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 pt-5 px-6'>
        <BackButton />
        <Social />
      </header>
      <main className='flex items-center w-full flex-col justify-center gap-4 h-[95%] overflow-scroll bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10  pb-10'>
        <span className='flex flex-col items-center'>
          <h1 className='md:text-flg text-fmd font-bold text-center'>
            Convert Your Threads Post To Images
          </h1>
          {contentState.postContent.length !== 0 && (
            <ul className='flex items-center gap-6 flex-wrap'>
              <li className='flex items-center gap-2'>
                <span>CTRL + B</span>
                <span>-</span>
                <span>Bold</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>CTRL + I</span>
                <span>-</span>
                <span>Italic</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>CTRL + U</span>
                <span>-</span>
                <span>Underline</span>
              </li>
            </ul>
          )}
        </span>
        {/* Input */}
        <Options setPostURL={setPostURL} />

        {contentState.contentLoading ? (
          <span className='flex items-center justify-center w-4/5 max-w-[850px]'>
            <PongSpinner
              size={110}
              color='#fff'
              loading={contentState.contentLoading}
            />
          </span>
        ) : (
          // Display Content
          !(contentState.postContent.length === 0) && <Preview />
        )}
      </main>
    </section>
  );
}
