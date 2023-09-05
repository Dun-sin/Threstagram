import { useState } from 'react';

import { PongSpinner } from 'react-spinners-kit';

import { elementToImage } from '../utils/helper';
import { useContent } from '../context/ContentContext';
import DisplayTheme from './Themes/DisplayTheme';

const zip = require('jszip')();

const Preview = () => {
  const { contentState } = useContent();

  const [downloadLoading, setDownloadLoading] = useState(false);

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

  return (
    <span className='w-4/5 flex flex-col justify-center items-center gap-2 h-auto max-w-[850px]'>
      <section
        className={`flex gap-4 w-full snap-x snap-mandatory overflow-x-scroll h-auto ${
          contentState.postContent.length === 1 && 'justify-center'
        }`}
      >
        {contentState.postContent.map((content: string, index: number) => (
          <DisplayTheme content={content} index={index} key={index} />
        ))}
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
