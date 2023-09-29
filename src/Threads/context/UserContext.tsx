import { ReactNode, createContext, useContext, useReducer } from 'react';
import { User } from '../../types';
import { UserReducer, initalUserState } from '../reducer/UserReducer';

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  userState: User;
  dispatchUser: React.Dispatch<any>;
};
const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, dispatchUser] = useReducer(UserReducer, initalUserState);

  const contextValue: UserContextType = {
    userState,
    dispatchUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
