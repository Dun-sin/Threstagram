import { useState } from 'react';

import { PongSpinner } from 'react-spinners-kit';
import { jsPDF } from 'jspdf';

import { elementToImage } from '../../utils/helper';
import DisplayTheme from '../Themes/DisplayTheme';

// context
import { useContent } from '../context/ContentContext';

const zip = require('jszip')();

const Preview = () => {
  const { contentState } = useContent();

  const [downloadLoading, setDownloadLoading] = useState({
    image: false,
    pdf: false,
  });

  const { postContent } = contentState;

  const handleImageDownload = async () => {
    if (contentState.postContent.length === 0) return;
    setDownloadLoading({ ...downloadLoading, image: true });

    const data = await elementToImage(contentState.postContent.length);

    if (data.length === 1) {
      const link = document.createElement('a');
      link.download = `instagram-0.png`;
      link.href = data[0];
      link.click();
      setDownloadLoading({ ...downloadLoading, image: false });
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

        setDownloadLoading({ ...downloadLoading, image: false });
      });
    });
  };

  const handlePDFDownload = async () => {
    if (contentState.postContent.length === 0) return;
    setDownloadLoading({ ...downloadLoading, pdf: true });

    const data = await elementToImage(contentState.postContent.length);

    const doc = new jsPDF('p', 'px', 'letter');

    data.forEach((url, index) => {
      if (index !== 0) {
        doc.addPage();
      }

      // Calculate the aspect ratio of the page
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const imageAspectRatio = pageWidth / pageHeight;

      doc.addImage(url, 'PNG', 0, 0, pageWidth, pageWidth / imageAspectRatio);
    });

    doc.save('Carousel.pdf');
    setDownloadLoading({ ...downloadLoading, pdf: false });
  };

  return (
    <span className='w-4/5 flex flex-col justify-center items-center gap-2 h-auto max-w-[850px] -z-10'>
      <section
        className={`flex gap-4 w-full snap-x snap-mandatory overflow-x-scroll h-auto ${
          postContent.length === 1 && 'justify-center'
        }`}
      >
        {postContent.map((content: string, index: number) => {
          return <DisplayTheme index={index} key={index} />;
        })}
      </section>
      <div className='flex gap-2 items-center'>
        <button
          className='bg-brand rounded-md h-16 p-4 font-medium w-[270px] flex items-center justify-center'
          onClick={handleImageDownload}
        >
          {downloadLoading.image ? (
            <span className='flex items-center justify-center w-full'>
              <PongSpinner
                size={50}
                color='#fff'
                loading={downloadLoading.image}
              />
            </span>
          ) : (
            <>Download Image</>
          )}
        </button>
        <button
          className='bg-brand rounded-md h-16 p-4 font-medium w-[270px] flex items-center justify-center'
          onClick={handlePDFDownload}
        >
          {downloadLoading.pdf ? (
            <span className='flex items-center justify-center w-full'>
              <PongSpinner
                size={50}
                color='#fff'
                loading={downloadLoading.pdf}
              />
            </span>
          ) : (
            <>Download PDF</>
          )}
        </button>
      </div>
    </span>
  );
};

export default Preview;
