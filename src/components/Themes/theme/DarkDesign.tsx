import { useRef } from 'react';
import Image from 'next/image';

import ContentEditable from 'react-contenteditable';
import { Icon } from '@iconify/react';

import { calculateFontSize } from '../../../utils/helper';
import {
  backgroundColor,
  onChange,
  pasteAsPlainText,
  handleKeyDown,
} from '../helper';

import { useUser } from '../../../context/UserContext';
import { useOptions } from '../../../context/OptionsContext';
import { useContent } from '../../../context/ContentContext';

type darkProps = {
  content: string;
  index: number;
};
export function DefaultDark({ content, index }: darkProps) {
  const { contentState, dispatchContent } = useContent();
  const { userState } = useUser();
  const { optionsState } = useOptions();

  const contentEditableRef = useRef(null);

  const { color, fontFamily } = optionsState;

  return (
    <div
      className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px]flex justify-between flex-col px-4 py-2 snap-center overflow-y-scroll rounded-md text-secondary instagram-${index}`}
      id='card-container'
      style={{ background: backgroundColor(color), fontFamily }}
    >
      <div className='h-[10%] w-full flex justify-between'>
        <div className='flex gap-1 items-center relative'>
          <div className='max-h-10 max-w-10 h-10 w-10 rounded-full relative overflow-hidden border-2 border-secondary border-spacing-6 z-10'>
            <Image
              src={userState.avatar}
              alt={userState.username}
              quality={100}
              fill
              className='object-cover'
            />
          </div>
          <p className='text-fxs font-medium text-center flex items-center justify-center border-2 border-secondary rounded-full px-4 absolute left-6'>
            <span>@{userState.username}</span>
          </p>
        </div>
        {contentState.postContent.length !== 1 && (
          <span className='text-fxs flex items-center font-semibold'>
            <span>
              {index}/{contentState.postContent.length - 1}
            </span>
          </span>
        )}
      </div>
      <div className='h-[80%] flex items-center justify-center'>
        <ContentEditable
          className={`whitespace-pre-line text-center`}
          style={{
            wordBreak: 'break-word',
            fontSize: calculateFontSize(content),
          }}
          disabled={false}
          tagName='p'
          onBlur={(e) => {
            const updatedContent = e.currentTarget.innerHTML;
            onChange(updatedContent, index, contentState, dispatchContent);
          }}
          onKeyDown={handleKeyDown}
          ref={contentEditableRef}
          onPaste={pasteAsPlainText}
          onChange={null}
          html={content}
        />
      </div>
      {contentState.postContent.length !== 1 && (
        <div className='min-h-[10%] w-full flex justify-end'>
          <div className='flex items-center'>
            <span
              className='h-10 w-10 rounded-full p-2 border-secondary border-2 relative left-4 flex justify-center items-center'
              style={{ background: backgroundColor(color) }}
            >
              <Icon
                icon='material-symbols:swipe-down-rounded'
                className='text-secondary h-8 w-8'
              />
            </span>
            <p className='text-fxs rounded-full border-2 border-secondary flex items-center justify-center px-4 text-center'>
              <span>Swipe</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
