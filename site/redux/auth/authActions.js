import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE
} from './authActionTypes';

const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

const signupFailure = () => ({
  type: SIGNUP_FAILURE,
  payload: 'Signup failed!'
});

export const signup = data => {
  return dispatch => {
    dispatch(signupRequest());
    axios({
      url: '/api/auth/signup',
      method: 'post',
      data
    })
      .then(() => {
        location.replace('/');
      })
      .catch(() => {
        dispatch(signupFailure);
      });
  };
};

const loginRequest = () => ({
  type: LOGIN_REQUEST
});

const loginFailure = errorMsg => ({
  type: LOGIN_FAILURE,
  payload: errorMsg
});

export const login = data => {
  return dispatch => {
    dispatch(loginRequest());
    axios({
      method: 'post',
      url: '/api/auth/login',
      data
    })
      .then(res => {
        location.replace('/');
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.response.data);
        dispatch(loginFailure('Username or password is wrong!'));
      });
  };
};

export const logout = data => {
  return dispatch => {
    dispatch(loginRequest());
    axios({
      url: '/api/auth/login',
      method: 'post',
      data
    })
      .then(res => {
        // eslint-disable-next-line no-console
        Router.push('/');
      })
      // eslint-disable-next-line no-console
      .catch(() => dispatch(loginFailure()));
  };
};
