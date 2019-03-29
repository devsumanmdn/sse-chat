import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE
} from './authActionTypes';

const exampleInitialState = {
  auth: {
    user: null,
    isLoggedIn: false,
    loggingIn: false,
    signingUp: false,
    loginError: '',
    signupError: ''
  }
};

const authReducer = (state = exampleInitialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginError: '',
        loggingIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loginError: payload
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signupError: '',
        signingUp: true
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupError: payload
      };
    default:
      return state;
  }
};

export default authReducer;
