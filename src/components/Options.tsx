import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';

import { Icon } from '@iconify/react';
import ColorPicker from 'react-pick-color';
import { PongSpinner } from 'react-spinners-kit';

import FontPicker from './FontPicker';
import Themes from '../components/Themes';

import { extractUserName } from '../utils/helper';
import { getUserProfile } from '../utils/api';

import { useContent } from '../context/ContentContext';
import { useUser } from '../context/UserContext';
import { useOptions } from '../context/OptionsContext';

type OptionsTypeProps = {
  setPostURL: Dispatch<SetStateAction<string>>;
};

const Options = (props: OptionsTypeProps) => {
  const { setPostURL } = props;

  const { contentState, dispatchContent } = useContent();
  const { dispatchUser } = useUser();
  const { optionsState, dispatchOptions } = useOptions();

  const { color } = optionsState;

  const [urlLoading, seturlLoading] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState({
    color1: false,
    color2: false,
  });
  const [addColor, setAddColor] = useState(false);

  const [value, setValue] = useState(contentState.postContent.length);

  const urlRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    dispatchContent({
      type: 'SET_CONTENT',
      payload: contentState.postContent.slice(0, value),
    });
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
    !addColor && dispatchOptions({ type: 'SET_COLOR2', payload: '' });
  }, [addColor]);

  const handleOnClick = async () => {
    if (urlRef.current === null) return;
    const url = urlRef.current.value;
    urlRef.current.value = '';

    if (!(url.includes('threads.net') && url.includes('post'))) {
      dispatchContent({ type: 'SET_ERROR', payload: 'Invalid Link' });
      return;
    }
    dispatchContent({ type: 'SET_ERROR', payload: '' });

    seturlLoading(true);
    setPostURL(url);

    const username = extractUserName(url);
    const avatar = await getUserProfile(username);

    dispatchUser({ type: 'ADD_USERNAME', payload: username });
    dispatchUser({ type: 'ADD_AVATAR', payload: avatar });
    seturlLoading(false);
  };

  const handleAddCoor = () => {
    setAddColor(!addColor);
  };

  const handleDropDown = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <header className='w-full flex items-center justify-center flex-col relative max-h-full z-20'>
      <div className='w-4/5 max-w-[850px] h-full'>
        <div className='flex items-center justify-center w-full'>
          <input
            type='text'
            placeholder='Threads Post URL'
            ref={urlRef}
            className='h-12 w-[80%] rounded-tl-md outline-none border-2 focus:border-brand px-4 text-primary'
          />
          {urlLoading ? (
            <span className='w-[20%] bg-brand flex items-center justify-center h-12 rounded-tr-md'>
              <PongSpinner size={30} color='#fff' loading={urlLoading} />
            </span>
          ) : (
            <button
              onClick={handleOnClick}
              className='bg-brand rounded-tr-md h-12 px-6 font-medium w-[20%] flex justify-center items-center'
            >
              <span>Submit</span>
            </button>
          )}
        </div>
        {contentState.postContent.length !== 0 && (
          <section className='w-full flex gap-4 justify-center relative select-none h-full'>
            <div
              className='flex items-center py-2 h-fit cursor-pointer'
              onClick={handleDropDown}
            >
              <p>Open Options</p>
              <Icon
                icon='mingcute:down-fill'
                className='h-6 w-6 text-brand flex items-center'
              />
            </div>
            {isOptionsOpen && (
              <div className='absolute w-full bg-secondary rounded-bl-md rounded-br-md'>
                <div
                  className='flex items-center py-2 w-full justify-center cursor-pointer'
                  onClick={handleDropDown}
                >
                  <p className='text-primary'>Close Options</p>
                  <Icon
                    icon='mingcute:up-fill'
                    className='h-6 w-6 text-brand flex items-center'
                  />
                </div>
                <div className='flex flex-col gap-5 text-primary p-6'>
                  <span className='flex gap-4 flex-wrap justify-center md:justify-between w-full z-30'>
                    {/* Color */}

                    <div className='flex gap-2 items-center'>
                      <p className='text-fxs'>Change Color: </p>
                      <div className='flex gap-1'>
                        <span>
                          <div
                            className='h-8 w-8 rounded-md cursor-pointer border border-black'
                            style={{
                              backgroundColor: color.color1,
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
                                color={color.color1}
                                onChange={(color) =>
                                  dispatchOptions({
                                    type: 'SET_COLOR1',
                                    payload: color.hex,
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
                              style={{ backgroundColor: color.color2 }}
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
                                  color={color.color2}
                                  onChange={(color) =>
                                    dispatchOptions({
                                      type: 'SET_COLOR2',
                                      payload: color.hex,
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
                          defaultValue={contentState.postContent.length}
                          onChange={(event) =>
                            setValue(Number(event.target.value))
                          }
                        >
                          {numbers(contentState.postContent.length).map(
                            (value) => (
                              <option value={value} key={value}>
                                {value}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Custom Font */}
                    <div className='flex gap-2 items-center'>
                      <p>Custom Font: </p>
                      <FontPicker
                        onChange={(value) =>
                          dispatchOptions({
                            type: 'SET_FONTFAMILY',
                            payload: value,
                          })
                        }
                      />
                    </div>
                  </span>
                  <Themes />
                </div>
              </div>
            )}
          </section>
        )}
      </div>
      <p className='text-red-600 text-fsm text-center'>{contentState.error}</p>
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
