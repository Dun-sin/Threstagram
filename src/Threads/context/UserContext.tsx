import React, { createContext, useContext, useReducer } from 'react';
import { UserAction, UserReducer, initialUserState } from '../reducer/UserReducer';

import { User } from '../../types';

interface UserContextType {
  userState: User;
  dispatchUser: React.Dispatch<UserAction>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userState, dispatchUser] = useReducer(UserReducer, initialUserState);

  return (
    <UserContext.Provider value={{ userState, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}