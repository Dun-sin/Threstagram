import { User } from '../../types';

export const initialUserState: User = {
  username: '',
  userId: '',
  name: '',
  profilePictureUrl: ''
};

export interface UserAction {
  type: 'SET_USERNAME' | 'SET_USER_ID' | 'SET_NAME' | 'SET_PROFILE_PICTURE' | 'CLEAR_USER';
  payload?: string;
}

export function UserReducer(state: User, action: UserAction): User {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload || '' };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload || '' };
    case 'SET_NAME':
      return { ...state, name: action.payload || '' };
    case 'SET_PROFILE_PICTURE':
      return { ...state, profilePictureUrl: action.payload || '' };
    case 'CLEAR_USER':
      return initialUserState;
    default:
      return state;
  }
}