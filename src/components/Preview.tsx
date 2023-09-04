import { useState } from 'react';
import Image from 'next/image';

import { PongSpinner } from 'react-spinners-kit';
import ContentEditable from 'react-contenteditable';

import { calculateFontSize, elementToImage } from '../utils/helper';
import { useContent } from '../context/ContentContext';
import { useUser } from '../context/UserContext';
import { useOptions } from '../context/OptionsContext';

const zip = require('jszip')();

const Preview = () => {
  const { contentState, dispatchContent } = useContent();
  const { userState } = useUser();
  const { optionsState } = useOptions();

  const { color, fontFamily } = optionsState;

  const [downloadLoading, setDownloadLoading] = useState(false);

  const backgroundColor =
    color.color2 === ''
      ? color.color1
      : `linear-gradient(to bottom right, ${color.color1}, ${color.color2})`;

  const handleDownload = async () => {
    if (contentState.postContent.length === 0) return;
    setDownloadLoading(true);

    const data = await elementToImage(contentState.postContent.length);

    if (data.length === 1) {
      const link = document.createElement('a');
      link.download = `instagram-0.png`;
      link.href = data[0];
      link.click();
      setDownloadLoading(false);
      return;
    }
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
    const newArray = [...contentState.postContent];
    if (content.length >= 500) {
      newContent = content.slice(0, 500);
      return;
    }
    newArray[index] = newContent;

    dispatchContent({ type: 'SET_CONTENT', payload: newArray });
  };

  return (
    <span className='w-4/5 flex flex-col justify-center items-center gap-2 h-auto max-w-[850px]'>
      <section
        className={`flex gap-4 w-full snap-x snap-mandatory overflow-x-scroll h-auto ${
          contentState.postContent.length === 1 && 'justify-center'
        }`}
      >
        {contentState.postContent.map((content: string, index: number) => {
          return (
            <div
              className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] flex justify-between flex-col rounded-md px-4 py-2 snap-center instagram-${index} overflow-y-scroll`}
              key={index}
              style={{ background: backgroundColor, fontFamily }}
              id='card-container'
            >
              {contentState.postContent.length !== 1 && (
                <div className='text-fmd font-semibold border-b w-full border-secondary border-spacing-5 h-[10%]'>
                  {index}
                </div>
              )}
              <ContentEditable
                className={`h-[80%] flex items-center whitespace-pre-line`}
                style={{
                  wordBreak: 'break-word',
                  fontSize: calculateFontSize(content),
                }}
                disabled={false}
                tagName='p'
                onBlur={(e) => {
                  const updatedContent = e.currentTarget.innerHTML;
                  onChange(updatedContent, index);
                }}
                onChange={null}
                html={content}
              />

              <div className='flex gap-1 items-center border-t border-secondary border-spacing-5 h-[10%]'>
                <span className='h-full flex items-center'>
                  <div className='h-7 w-7 rounded-full relative overflow-hidden border-2 border-secondary  border-spacing-6'>
                    <Image
                      src={userState.avatar}
                      alt={userState.username}
                      quality={100}
                      fill
                      className='object-cover'
                    />
                  </div>
                </span>
                <p className='text-fxs font-medium text-center h-full flex items-center'>
                  <span>@{userState.username}</span>
                </p>
              </div>
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
            <PongSpinner size={50} color='#fff' loading={downloadLoading} />
          </span>
        ) : (
          <>Download</>
        )}
      </button>
    </span>
  );
};

export default Preview;
