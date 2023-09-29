import { User } from '../../types';

export const initalUserState: User = {
  username: '',
  avatar: '',
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USERNAME':
      return { ...state, username: action.payload };
    case 'ADD_AVATAR':
      return { ...state, avatar: action.payload };
  }
};
