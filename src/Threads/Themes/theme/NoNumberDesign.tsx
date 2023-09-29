import { useRef } from 'react';

import ContentEditable from 'react-contenteditable';
import { Icon } from '@iconify/react';

import { calculateFontSize } from '../../../utils/helper';
import {
  backgroundColor,
  handleContentChange,
  pasteAsPlainText,
  handleKeyDown,
  deleteContent,
} from '../helper';

import { useUser } from '../../context/UserContext';
import { useOptions } from '../../context/OptionsContext';
import { useContent } from '../../context/ContentContext';

type NoNumberProps = {
  index: number;
};

export function DefaultNoNumber({ index }: NoNumberProps) {
  const { contentState, dispatchContent } = useContent();
  const { userState } = useUser();
  const { optionsState } = useOptions();

  const contentEditableRef = useRef(null);

  const { color, fontFamily, fontColor } = optionsState;

  const content = contentState.postContent[index];

  return (
    <div className='relative'>
      <div
        className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px]flex justify-between flex-col px-4 py-2 snap-center overflow-y-scroll text-secondary instagram-${index}`}
        id='card-container'
        style={{
          background: backgroundColor(color),
          fontFamily,
          color: fontColor,
        }}
      >
        <div className='flex gap-2 flex-col justify-center h-[90%]'>
          <ContentEditable
            className={`whitespace-pre-line`}
            style={{
              wordBreak: 'break-word',
              fontSize: calculateFontSize(content),
            }}
            disabled={false}
            tagName='p'
            onChange={(e) => {
              const updatedContent = e.target.value;
              handleContentChange(
                updatedContent,
                index,
                contentState,
                dispatchContent
              );
            }}
            onKeyDown={handleKeyDown}
            ref={contentEditableRef}
            onPaste={pasteAsPlainText}
            html={content}
          />

          {index === 0 && contentState.postContent.length !== 1 && (
            <p className='px-2 border border-secondary w-fit rounded-lg text-fxs flex items-center'>
              <span>Swipe</span>
              <Icon
                icon='mingcute:arrow-right-fill'
                className='h-7 w-7 inline-flex items-center'
              />
            </p>
          )}
        </div>
        <div className='flex gap-1 items-center'>
          <p className='text-fxs font-medium text-center h-full flex items-center left-3'>
            <span>@{userState.username}</span>
          </p>
        </div>
      </div>

      <span className='absolute -right-3 top-0 z-10'>
        <Icon
          icon='ep:remove-filled'
          className='h-8 w-8 text-secondary cursor-pointer'
          onClick={() => deleteContent(index, contentState, dispatchContent)}
        />
      </span>
    </div>
  );
}
