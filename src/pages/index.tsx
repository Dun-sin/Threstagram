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

import { User, ColorType } from '../types';

export default function Home() {
  const [contentLoading, setContentLoading] = useState(false);

  const [error, setError] = useState('');
  const [postURL, setPostURL] = useState('');
  const [color, setColor] = useState<ColorType>({
    color1: '#ff4847',
    color2: '',
  });
  const [fontFamily, setFontFamily] = useState('Exo2');

  const [postContent, setPostContent] = useState([]);
  const [postUser, setPostUser] = useState<User>({
    username: '',
    avatar: '',
  });

  useEffect(() => {
    if (postUser.username === '' && postURL === '') return;
    (async () => {
      setContentLoading(true);
      const id = extractPostID(postURL);
      const content = await getPostContent(id, postUser.username);

      setContentLoading(false);
      if (content.isSuccess) {
        setPostContent(content.message);
      } else {
        setError(content.message);
      }
    })();
  }, [postUser]);

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
      <section className='bg-primary text-secondary flex items-center flex-col justify-center md:h-screen min-h-screen w-screen gap-10 pt-5 pb-10'>
        <Social />
        <main className='flex items-center w-full flex-col justify-center gap-4'>
          <h1 className='md:text-flg text-fmd font-bold text-center'>
            Convert Your Threads Post To Images
          </h1>
          {/* Input */}
          <Options
            setPostURL={setPostURL}
            setPostUser={setPostUser}
            setFontFamily={setFontFamily}
            colorState={{ color, setColor }}
            postState={{ posts: postContent, setPostContent }}
            errorState={{ error, setError }}
          />

          {contentLoading ? (
            <span className='flex items-center justify-center w-4/5 max-w-[850px]'>
              <PongSpinner size={110} color='#fff' loading={contentLoading} />
            </span>
          ) : (
            // Display Content
            !(postContent.length === 0) && (
              <Preview
                postState={{ posts: postContent, setPostContent }}
                color={color}
                postUser={postUser}
                fontFamily={fontFamily}
              />
            )
          )}
        </main>
      </section>
    </>
  );
}
