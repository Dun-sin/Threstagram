import { createContext, useContext, useReducer } from 'react';
import { ThemesReducer, initialThemesState } from '../reducer/ThemesReducer';

type ThemesContextType = {
  themesState: {
    theme: 'number' | 'noNumber';
    themeName: string;
  };
  dispatchThemes: React.Dispatch<any>;
};

const ThemesContext = createContext<ThemesContextType | null>(null);

export const useThemes = () => {
  const context = useContext(ThemesContext);
  if (!context) {
    throw Error(`Can't use useThemes outside the provider`);
  }

  return context;
};

export const ThemesProvider = ({ children }) => {
  const [themesState, dispatchThemes] = useReducer(
    ThemesReducer,
    initialThemesState
  );

  const contextValue: ThemesContextType = {
    themesState,
    dispatchThemes,
  };

  return (
    <ThemesContext.Provider value={contextValue}>
      {children}
    </ThemesContext.Provider>
  );
};
