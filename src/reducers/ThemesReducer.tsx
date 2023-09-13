// ThemesReducer.tsx
export const initialThemesState = {
  themeName: 'defaultNumber',
  theme: 'number',
};

export function ThemesReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        themeName: action.payload.themeName,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
}
