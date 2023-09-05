// next/react
import { useEffect, useState } from 'react';

// libraries
import { NextSeo } from 'next-seo';
import { PongSpinner } from 'react-spinners-kit';

// components
import Social from '../components/Social';

// utils
import { extractPostID } from '../utils/helper';
import { getPostContent } from '../utils/api';
import Options from '../components/Options';
import Preview from '../components/Preview';

// context
import { useUser } from '../context/UserContext';
import { useContent } from '../context/ContentContext';

export default function Home() {
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

      <header className='flex items-center justify-end w-full backdrop-blur-[80px] pt-5'>
        <Social />
      </header>
      <main className='flex items-center w-full flex-col justify-center gap-4 h-[95%] overflow-scroll backdrop-blur-[90px] pb-10'>
        <h1 className='md:text-flg text-fmd font-bold text-center'>
          Convert Your Threads Post To Images
        </h1>
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
