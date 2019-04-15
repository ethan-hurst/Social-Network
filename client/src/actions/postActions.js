import axios from 'axios';
import {
  ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS,
} from './types';

export const setPostLoading = () => ({
  type: POST_LOADING,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const addPost = postData => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const addComment = (postId, commendData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commendData)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_POSTS,
      payload: null,
    }));
};

export const getPost = id => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_POST,
      payload: null,
    }));
};

export const addLike = id => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const deleteLike = id => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const deletePost = id => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: id,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};
