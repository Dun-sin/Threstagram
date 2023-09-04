import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';

import { Icon } from '@iconify/react';
import ColorPicker from 'react-pick-color';
import { InfinitySpin } from 'react-loader-spinner';
// import FontPicker from 'react-fontpicker-ts';
// import 'react-fontpicker-ts/dist/index.css';

import { extractUserName } from '../utils/helper';
import { getUserProfile } from '../utils/api';
import FontPicker from './FontPicker';

import { User, ColorType } from '../types';

type optionsType = {
  setPostURL: Dispatch<SetStateAction<string>>;
  setPostUser: Dispatch<SetStateAction<User>>;
  setFontFamily: Dispatch<SetStateAction<string>>;
  colorState: {
    color: ColorType;
    setColor: Dispatch<SetStateAction<ColorType>>;
  };
  postState: {
    posts: any[];
    setPostContent: Dispatch<SetStateAction<any[]>>;
  };
  errorState: {
    error: string;
    setError: Dispatch<SetStateAction<string>>;
  };
};

const Options = (props: optionsType) => {
  const {
    setPostURL,
    setPostUser,
    colorState,
    postState,
    setFontFamily,
    errorState,
  } = props;

  const [urlLoading, seturlLoading] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState({
    color1: false,
    color2: false,
  });
  const [addColor, setAddColor] = useState(false);

  const [value, setValue] = useState(postState.posts.length);

  const urlRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    postState.setPostContent(postState.posts.slice(0, value));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsideColorPicker =
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target);

      if (
        isClickOutsideColorPicker &&
        (isPickerOpen.color1 || isPickerOpen.color2)
      ) {
        setIsPickerOpen({ color1: false, color2: false });
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  useEffect(() => {
    !addColor && colorState.setColor({ ...colorState.color, color2: '' });
  }, [addColor]);

  const handleOnClick = async () => {
    if (urlRef.current === null) return;
    const url = urlRef.current.value;
    urlRef.current.value = '';

    if (!(url.includes('threads.net') && url.includes('post'))) {
      errorState.setError('Invalid Link');
      return;
    }
    errorState.setError('');

    seturlLoading(true);
    setPostURL(url);

    const username = extractUserName(url);
    const avatar = await getUserProfile(username);

    setPostUser({ username, avatar });
    seturlLoading(false);
  };

  const handleAddCoor = () => {
    setAddColor(!addColor);
  };

  return (
    <header className='w-full flex items-center justify-center flex-col relative'>
      <div className='w-4/5 max-w-[850px]'>
        <div className='flex items-center justify-center w-full'>
          <input
            type='text'
            placeholder='Threads Post URL'
            ref={urlRef}
            className='h-12 w-[80%] rounded-tl-md outline-none border-2 focus:border-brand px-4 text-primary'
          />
          {urlLoading ? (
            <span className='w-[20%] bg-brand flex items-center justify-center h-12'>
              <InfinitySpin width='50' color='#ffff' />
            </span>
          ) : (
            <button
              onClick={handleOnClick}
              className='bg-brand rounded-tr-md h-12 px-6 font-medium w-[20%]'
            >
              Submit
            </button>
          )}
        </div>
        {postState.posts.length !== 0 && (
          <div className='w-full flex-wrap bg-secondary p-2 text-primary rounded-bl-md rounded-br-md flex gap-4 justify-center'>
            {/* Color */}
            <div className='flex gap-2 items-center'>
              <p className='text-fxs'>Change Color: </p>
              <div className='flex gap-1'>
                <span>
                  <div
                    className='h-8 w-8 rounded-md cursor-pointer border border-black'
                    style={{
                      backgroundColor: colorState.color.color1,
                    }}
                    onClick={() =>
                      setIsPickerOpen({
                        ...isPickerOpen,
                        color1: !isPickerOpen.color1,
                      })
                    }
                  />
                  {isPickerOpen.color1 && (
                    <span
                      className='absolute top-20 left-[30%]'
                      ref={colorPickerRef}
                    >
                      <ColorPicker
                        color={colorState.color.color1}
                        onChange={(color) =>
                          colorState.setColor({
                            ...colorState.color,
                            color1: color.hex,
                          })
                        }
                      />
                    </span>
                  )}
                </span>
                {addColor && (
                  <span>
                    <div
                      className='h-8 w-8 rounded-md cursor-pointer border border-black'
                      style={{ backgroundColor: colorState.color.color2 }}
                      onClick={() =>
                        setIsPickerOpen({
                          ...isPickerOpen,
                          color2: !isPickerOpen.color2,
                        })
                      }
                    />
                    {isPickerOpen.color2 && (
                      <span
                        className='absolute top-20 left-[30%]'
                        ref={colorPickerRef}
                      >
                        <ColorPicker
                          color={colorState.color.color2}
                          onChange={(color) =>
                            colorState.setColor({
                              ...colorState.color,
                              color2: color.hex,
                            })
                          }
                        />
                      </span>
                    )}
                  </span>
                )}
              </div>
              <Icon
                icon={addColor ? 'ic:round-minus' : 'ic:round-plus'}
                className='h-6 w-6 cursor-pointer'
                onClick={handleAddCoor}
              />
            </div>

            {/* Number of threads */}
            <div className='flex gap-2 items-center'>
              <p>Number of Threads: </p>
              <div>
                <select
                  className='border-none w-12 p-2 rounded-md border-brand border-2 cursor-pointer bg-secondary'
                  defaultValue={postState.posts.length}
                  onChange={(event) => setValue(Number(event.target.value))}
                >
                  {numbers(postState.posts.length).map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex gap-2 items-center'>
              <p>Custom Font: </p>
              <FontPicker onChange={(value) => setFontFamily(value)} />
            </div>
          </div>
        )}
      </div>
      <p className='text-red-600 text-fsm text-center'>{errorState.error}</p>
    </header>
  );
};

export default Options;

function numbers(postNumber: number) {
  const number = [];
  for (let index = 1; index < postNumber + 1; index++) {
    number.push(index);
  }

  return number;
}
