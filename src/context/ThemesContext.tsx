import { createContext, useContext, useReducer } from 'react';
import { ThemesReducer, initalThemesState } from '../reducers/ThemesReducer';

type ThemesContextType = {
  themesState: string;
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
    initalThemesState
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
