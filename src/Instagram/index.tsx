import React, { useEffect, useRef, useState } from 'react';

import { PongSpinner } from 'react-spinners-kit';
import { jsPDF } from 'jspdf';

import Input from '../components/Input';
import SubmitButton from '../components/Button/SubmitButton';
import BackButton from '../components/Button/BackButton';
import Social from '../components/Social';

const Instagram = () => {
  const [loading, setLoading] = useState({ status: false, message: '' });
  const urlRef = useRef<HTMLInputElement>(null);

  const handleOnClick = async () => {
    if (urlRef.current === null) return;
    setLoading({ status: true, message: '' });
    const splitUrl = urlRef.current.value.split('/p/');
    if (splitUrl[1] === undefined) {
      setLoading({
        status: false,
        message: 'Invalid Url. Please provide a valid instagram image link.',
      });
      return;
    }
    const url = splitUrl[1].split('/')[0];

    setLoading({ status: true, message: 'downloading images' });

    try {
      const response = await fetch(`/api/instagram/${url}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const { data } = await response.json();

      convertToPDF(data);
    } catch (err) {
      setLoading({ status: false, message: err.message });
    }
  };

  const convertToPDF = (data) => {
    const doc = new jsPDF('p', 'px', 'letter');
    setLoading({ status: true, message: 'Converting to images' });

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

    setLoading({ status: false, message: '' });
  };

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
      <main className='flex items-center w-full justify-center overflow-auto bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 h-full pb-10 gap-4'>
        <div className='w-4/5 min-w-[300px] flex items-center flex-col gap-4'>
          <h1 className='text-flg font-bold'>
            Convert Your Instagram Post to PDF
          </h1>
          <div className='flex items-center w-full max-w-[500px] min-w-[300px]'>
            <Input refValue={urlRef} placeholder='Instagram Post URL' />
            {loading.status ? (
              <span className='w-[20%] bg-brand flex items-center justify-center h-12 rounded-tr-md'>
                <PongSpinner size={30} color='#fff' loading={loading.status} />
              </span>
            ) : (
              <SubmitButton handleOnClick={handleOnClick} text='Download' />
            )}
          </div>
          <p className='empty:hidden'>{loading.message}</p>
        </div>
      </main>
    </section>
  );
};

export default Instagram;
