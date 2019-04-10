import axios from 'axios';
import {
  GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE,
} from './types';

export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
});

export const clearProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {},
    }));
};
