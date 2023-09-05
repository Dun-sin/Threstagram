export const initalThemesState = 'defaultLight';

export function ThemesReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return action.payload;
  }
}
