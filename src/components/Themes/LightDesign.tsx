import Image from 'next/image';

import ContentEditable from 'react-contenteditable';

import { calculateFontSize } from '../../utils/helper';
import { useUser } from '../../context/UserContext';
import { useOptions } from '../../context/OptionsContext';
import { useContent } from '../../context/ContentContext';

type DefaultLightProps = {
  content: string;
  index: number;
};
function DefaultLight({ content, index }: DefaultLightProps) {
  const { contentState, dispatchContent } = useContent();
  const { userState } = useUser();
  const { optionsState } = useOptions();

  const { color, fontFamily } = optionsState;

  const backgroundColor =
    color.color2 === ''
      ? color.color1
      : `linear-gradient(to bottom right, ${color.color1}, ${color.color2})`;

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
    <div
      className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] flex justify-between flex-col px-4 py-2 snap-center instagram-${index} overflow-y-scroll`}
      key={index}
      style={{ background: backgroundColor, fontFamily }}
      id='card-container'
    >
      {contentState.postContent.length !== 1 && (
        <div className='text-fmd font-semibold w-full h-[10%]'>{index}</div>
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

export const pickLightTheme = (
  name: string = 'defaultLight',
  content: string,
  index: number
) => {
  let theme: any;
  switch (name) {
    case 'defaultLight':
      theme = <DefaultLight content={content} index={index} />;
      break;

    default:
      break;
  }

  return theme;
};
