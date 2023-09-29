import { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  OptionsReducer,
  OptionsType,
  initalOptionsState,
} from '../reducer/OptionsReducer';

type OptionsContextType = {
  optionsState: OptionsType;
  dispatchOptions: React.Dispatch<any>;
};

type OptionsProviderProps = {
  children: ReactNode;
};

const OptionsContext = createContext<OptionsContextType | null>(null);

export const useOptions = () => {
  const context = useContext(OptionsContext);

  if (!context) {
    throw new Error('useContent must be used within a OptionsProvider');
  }

  return context;
};

export const OptionsProvider = ({ children }: OptionsProviderProps) => {
  const [optionsState, dispatchOptions] = useReducer(
    OptionsReducer,
    initalOptionsState
  );

  const contextValue: OptionsContextType = {
    optionsState,
    dispatchOptions,
  };

  return (
    <OptionsContext.Provider value={contextValue}>
      {children}
    </OptionsContext.Provider>
  );
};
