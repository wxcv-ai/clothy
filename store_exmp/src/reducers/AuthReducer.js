import { SIGN_IN, SIGN_OUT } from '../actions';

const initialState = {
  isSignedIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      console.log('ok');
      return { ...state, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
