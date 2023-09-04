import { ColorType } from '../types';

export type OptionsType = {
  color: ColorType;
  fontFamily: string;
};

export const initalOptionsState: OptionsType = {
  color: {
    color1: '#ff4847',
    color2: '',
  },
  fontFamily: 'Exo2',
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
  }
};
