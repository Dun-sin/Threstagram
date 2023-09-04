import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { InfinitySpin } from 'react-loader-spinner';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';

import { calculateFontSize, elementToImage } from '../utils/helper';
import { User, ColorType } from '../types';

type PreviewProps = {
  postState: {
    posts: any[];
    setPostContent: Dispatch<SetStateAction<any[]>>;
  };
  color: ColorType;
  postUser: User;
  fontFamily: string;
};

const zip = require('jszip')();

const Preview = (props: PreviewProps) => {
  const { postState, color, postUser, fontFamily } = props;
  const [downloadLoading, setDownloadLoading] = useState(false);

  const backgroundColor =
    color.color2 === ''
      ? color.color1
      : `linear-gradient(to bottom right, ${color.color1}, ${color.color2})`;

  const handleDownload = async () => {
    if (postState.posts.length === 0) return;
    setDownloadLoading(true);

    const data = await elementToImage(postState.posts.length);
    const promises = data.map((url, index) => {
      return fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          zip.file(`instagram-${index}.png`, blob);
        });
    });

    // Wait for all image fetch and zip operations to complete
    Promise.all(promises).then(() => {
      // Generate the zip file
      zip.generateAsync({ type: 'blob' }).then((content) => {
        const zipFile = new Blob([content], { type: 'application/zip' });

        // Create a download link for the zip file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipFile);
        link.download = 'instagram-images.zip';
        link.click();

        setDownloadLoading(false);
      });
    });
  };

  const onChange = (content?: any, index?: number) => {
    let newContent = content;
    const newArray = [...postState.posts];
    if (content.length >= 500) {
      newContent = content.slice(0, 500);
      return;
    }
    newArray[index] = newContent;

    postState.setPostContent(newArray);
  };

  return (
    <span className='w-4/5 flex flex-col justify-center items-center gap-2 h-auto max-w-[850px]'>
      <section
        className={`flex gap-4 w-full snap-x snap-mandatory overflow-x-scroll h-auto ${
          postState.posts.length === 1 && 'justify-center'
        }`}
      >
        {postState.posts.map((content: string, index: number) => {
          return (
            <div
              className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] flex justify-between flex-col rounded-md p-4 snap-center instagram-${index} overflow-y-scroll`}
              key={index}
              style={{ background: backgroundColor, fontFamily }}
              id='card-container'
            >
              {postState.posts.length !== 1 && (
                <span className='text-fmd font-semibold border-b w-full border-secondary border-spacing-5 h-[10%]'>
                  {index}
                </span>
              )}
              <ContentEditable
                className={`h-[80%] flex items-center whitespace-pre-line`}
                style={{ fontSize: calculateFontSize(content) }}
                disabled={false}
                tagName='p'
                onBlur={(e) => {
                  const updatedContent = e.currentTarget.innerHTML;
                  onChange(updatedContent, index);
                }}
                onChange={null}
                html={content}
              />

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
          );
        })}
      </section>
      <button
        className='bg-brand rounded-md h-16 p-4 font-medium w-[270px] flex items-center justify-center'
        onClick={handleDownload}
      >
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
