import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

// REDUCERS
import auth from './auth/authReducer';
import friends from './friends/friendsReducer';
// import notifications from './notifications/notificationReducer';
// rootReducer
const rootReducer = combineReducers({
  auth,
  friends
  // notifications
});

const makeStore = (initialState = {}, { req, isServer }) => {
  if (isServer && req) {
    console.log(req.user);
    initialState = {
      ...initialState,
      auth: {
        user: req.user && req.user,
        isLoggedIn: req.isAuthenticated
      }
    };
  }

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
  );
};

export default makeStore;
