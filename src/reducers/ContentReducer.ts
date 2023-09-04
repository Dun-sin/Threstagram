export const initialContentState = {
  contentLoading: false,
  postContent: [],
  error: '',
};

export type ContentStateType = {
  contentLoading: boolean;
  postContent: any[];
  error: string;
};

export const contentReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, contentLoading: action.payload };
    case 'SET_CONTENT':
      return { ...state, contentLoading: false, postContent: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
