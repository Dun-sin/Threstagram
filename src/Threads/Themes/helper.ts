import { ContentStateType } from '../reducer/ContentReducer';
import { ColorType } from '../../types';

export const pasteAsPlainText = (event) => {
  event.preventDefault();

  const text = event.clipboardData.getData('text/plain');
  document.execCommand('insertHTML', false, text);
};

export const handleContentChange = (
  content: any,
  index: number,
  contentState: ContentStateType,
  dispatchContent: any
) => {
  let newContent = content;
  const newArray = [...contentState.postContent];
  if (content.length >= 500) {
    newContent = content.slice(0, 500);
  }
  newArray[index] = newContent;

  dispatchContent({ type: 'SET_CONTENT', payload: newArray });
};

export const backgroundColor = (color: ColorType) =>
  color.color2 === ''
    ? color.color1
    : `linear-gradient(to bottom right, ${color.color1}, ${color.color2})`;

export const handleKeyDown = (e) => {
  if (e.ctrlKey) {
    switch (e.key) {
      case 'i':
        // Ctrl+I pressed, make selected text italic
        document.execCommand('italic', false, null);
        e.preventDefault();
        break;
      case 'b':
        // Ctrl+B pressed, make selected text bold
        document.execCommand('bold', false, null);
        e.preventDefault();
        break;
      case 'u':
        // Ctrl+U pressed, make selected text underlined
        document.execCommand('underline', false, null);
        e.preventDefault();
        break;
      default:
        break;
    }
  }
};

export const deleteContent = (
  index: number,
  contentState: ContentStateType,
  dispatchContent: any
) => {
  const newArray = [...contentState.postContent];

  newArray.splice(index, 1);

  dispatchContent({ type: 'SET_CONTENT', payload: newArray });
};
