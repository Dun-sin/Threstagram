import Image from 'next/image';

import ContentEditable from 'react-contenteditable';
// import ReactMarkdown from 'react-markdown';

import { calculateFontSize } from '../../utils/helper';
import { useUser } from '../../context/UserContext';
import { useOptions } from '../../context/OptionsContext';
import { useContent } from '../../context/ContentContext';
import { ReactNode } from 'react';

type lightProps = {
  content: string;
  index: number;
  children: ReactNode;
};

function DesignWrapper({ children, content, index }: lightProps) {
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

  const pasteAsPlainText = (event) => {
    event.preventDefault();

    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };

  return { children };
}

export default DesignWrapper;
