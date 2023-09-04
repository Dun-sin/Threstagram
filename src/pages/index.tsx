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
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          url: 'https://threstagram.vercel.app',
          title: 'Threstagram',
          description: 'Convert Your Threads Posts to Images',
          images: [
            {
              url: 'https://github-production-user-asset-6210df.s3.amazonaws.com/78784850/263960112-c1cb2dba-2379-4aa4-aba1-5ac124f7bcae.png',
              alt: 'Threstagram Alt',
              height: 600,
              width: 800,
            },
          ],
        }}
      />

      <section className='bg-primary text-secondary flex items-center flex-col justify-center md:h-screen min-h-screen w-screen gap-10 pt-5 pb-10 font-sans'>
        <Social />
        <main className='flex items-center w-full flex-col justify-center gap-4'>
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
    </>
  );
}
