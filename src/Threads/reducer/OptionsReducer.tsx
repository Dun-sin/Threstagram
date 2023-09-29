import { ColorType } from '../../types';

export type OptionsType = {
  color: ColorType;
  fontFamily: string;
  fontColor: string;
};

export const initalOptionsState: OptionsType = {
  color: {
    color1: '#1a8fbb',
    color2: '',
  },
  fontFamily: 'Exo2',
  fontColor: '#fff',
};

export const OptionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COLOR1':
      return { ...state, color: { ...state.color, color1: action.payload } };
    case 'SET_COLOR2':
      return { ...state, color: { ...state.color, color2: action.payload } };
    case 'SET_COLORS':
      return {
        ...state,
        color: { color1: action.payload.color1, color2: action.payload.color2 },
      };
    case 'SET_FONTFAMILY':
      return { ...state, fontFamily: action.payload };
    case 'SET_FONTCOLOR':
      return { ...state, fontColor: action.payload };
    default:
      break;
  }
};
