// ThemesReducer.tsx
export const initialThemesState = { themeName: 'defaultLight', theme: 'light' };

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
