import {
  FETCH_ALL_FRIENDS_REQUEST,
  FETCH_ALL_FRIENDS_SUCCESS,
  FETCH_ALL_FRIENDS_FAILURE
} from './friendsActionTypes';

const initialState = {
  isFetching: false,
  fetchError: '',
  data: []
};

const friendsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_FRIENDS_REQUEST:
      return {
        ...state,
        fetchError: '',
        isFetching: true
      };
    case FETCH_ALL_FRIENDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload.data
      };
    case FETCH_ALL_FRIENDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchError: payload.error
      };
    default:
      return state;
  }
};

export default friendsReducer;
