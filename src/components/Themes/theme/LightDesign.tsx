import { useRef } from 'react';
import Image from 'next/image';

import ContentEditable from 'react-contenteditable';
// import ReactMarkdown from 'react-markdown';

import { calculateFontSize } from '../../../utils/helper';
import {
  backgroundColor,
  handleContentChange,
  pasteAsPlainText,
  handleKeyDown,
} from '../helper';

import { useUser } from '../../../context/UserContext';
import { useOptions } from '../../../context/OptionsContext';
import { useContent } from '../../../context/ContentContext';

type lightProps = {
  index: number;
};

export function DefaultLight({ index }: lightProps) {
  const { contentState, dispatchContent } = useContent();
  const { userState } = useUser();
  const { optionsState } = useOptions();

  const contentEditableRef = useRef(null);

  const { color, fontFamily } = optionsState;

  const content = contentState.postContent[index];

  return (
    <div
      className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] flex justify-between flex-col px-4 py-2 snap-center instagram-${index} overflow-y-scroll`}
      key={index}
      style={{ background: backgroundColor(color), fontFamily }}
      id='card-container'
    >
      {contentState.postContent.length !== 1 && (
        <div className='text-fmd font-semibold w-full h-[10%]'>{index}</div>
      )}
      <div className='h-[80%] flex items-center'>
        <ContentEditable
          html={content}
          disabled={false}
          tagName='p'
          onChange={null}
          onBlur={(e) => {
            const updatedContent = e.currentTarget.innerHTML;
            handleContentChange(
              updatedContent,
              index,
              contentState,
              dispatchContent
            );
          }}
          onPaste={pasteAsPlainText}
          className={`whitespace-pre-line`}
          style={{
            wordBreak: 'break-word',
            fontSize: calculateFontSize(content),
          }}
          onKeyDown={handleKeyDown}
          ref={contentEditableRef}
        />
      </div>

      <div className='flex gap-1 items-center h-[10%]'>
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
}
