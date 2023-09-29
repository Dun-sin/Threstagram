import { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  contentReducer,
  initialContentState,
  ContentStateType,
} from '../reducer/ContentReducer';

// Define the type for the content context
type ContentContextType = {
  contentState: ContentStateType;
  dispatchContent: React.Dispatch<any>;
};

type ContentProviderProps = {
  children: ReactNode;
};

// Declare and export ContentContext
const ContentContext = createContext<ContentContextType | null>(null);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [contentState, dispatchContent] = useReducer(
    contentReducer,
    initialContentState
  );

  const contextValue: ContentContextType = {
    contentState,
    dispatchContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};
