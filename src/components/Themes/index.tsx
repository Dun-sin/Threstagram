import { useRef, useState } from 'react';

import Image from 'next/image';
import { useThemes } from '../../context/ThemesContext';

const Themes = () => {
  const { dispatchThemes } = useThemes();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const optionRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = (value: 'light' | 'dark') => {
    let position: number;
    if (value === 'dark') {
      position = 0;
    } else if (value === 'light') {
      position = 60;
    }
    optionRef.current.style.left = position + 'px';
    setTheme(value);
  };
  return (
    <section className='w-full'>
      <div className='flex justify-between items-center'>
        <p className='text-xl font-semibold'>
          {theme === 'dark' ? 'Dark' : 'Light'} Themes
        </p>

        <div className='relative flex h-[30px] border justify-between rounded-lg bg-zinc-900 border-secondary'>
          <div
            className='w-[60px] top-0 absolute h-full p-1 -z-0 transition-all'
            style={{ left: '60px' }}
            ref={optionRef}
          >
            <div
              className='w-full h-full bg-white rounded-lg'
              style={{
                background:
                  'linear-gradient(to right, #fffafe, #feffe4, #fbeeff, #e8fdff, #ffeff8, #edf8ff)',
              }}
            />
          </div>
          <span
            className={`w-[60px] flex items-center justify-center z-10 font-medium cursor-pointer ${
              theme === 'dark' ? 'text-primary' : 'text-secondary'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </span>
          <span
            className={`w-[60px] flex items-center justify-center z-10 font-medium cursor-pointer ${
              theme === 'dark' ? 'text-secondary' : 'text-primary'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </span>
        </div>
      </div>
      {theme === 'light' && (
        <section className='flex gap-2 w-full snap-x snap-mandatory overflow-x-scroll'>
          <div
            className='cursor-pointer'
            onClick={() =>
              dispatchThemes({
                type: 'CHANGE_THEME',
                payload: 'defaultLight',
              })
            }
          >
            <div
              className={`min-h-[162.5px] max-h-[162.5px] h-[162.5px] min-w-[140px] max-w-[140px] w-[140px] flex justify-between flex-col px-4 py-2 snap-center overflow-y-scroll rounded-md bg-brand text-secondary`}
              id='card-container'
            >
              <div className='text-fmd font-semibold w-full h-[10%]'>1</div>
              <div
                className={`h-[80%] flex items-center whitespace-pre-line text-sm`}
                style={{
                  wordBreak: 'break-word',
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                recusandae, iusto nam, odio vero reprehenderit dolores deleniti
              </div>

              <div className='flex gap-1 items-center h-[10%]'>
                <span className='h-full flex items-center'>
                  <div className='h-4 w-4 rounded-full relative overflow-hidden border-2 border-secondary  border-spacing-6'>
                    <Image
                      src='https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
                      alt='profile_user_default'
                      quality={100}
                      fill
                      className='object-cover'
                    />
                  </div>
                </span>
                <p className='text-fxs font-medium text-center h-full flex items-center'>
                  <span>@Mark_zucky</span>
                </p>
              </div>
            </div>
            <p className='text-center'>Default Light</p>
          </div>
        </section>
      )}
    </section>
  );
};

export default Themes;
