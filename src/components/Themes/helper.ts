import { ContentStateType } from '../../reducers/ContentReducer';
import { ColorType } from '../../types';

export const pasteAsPlainText = (event) => {
  event.preventDefault();

  const text = event.clipboardData.getData('text/plain');
  document.execCommand('insertHTML', false, text);
};

export const onChange = (
  content: any,
  index: number,
  contentState: ContentStateType,
  dispatchContent: any
) => {
  let newContent = content;
  const newArray = [...contentState.postContent];
  if (content.length >= 500) {
    newContent = content.slice(0, 500);
    return;
  }
  newArray[index] = newContent;

  dispatchContent({ type: 'SET_CONTENT', payload: newArray });
};

export const backgroundColor = (color: ColorType) =>
  color.color2 === ''
    ? color.color1
    : `linear-gradient(to bottom right, ${color.color1}, ${color.color2})`;
