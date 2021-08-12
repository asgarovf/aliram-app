import {
  ADD_COMMENT,
  ADD_POST,
  PUSH_NEW_COMMENTS,
  PUSH_NEW_POSTS,
  SET_POSTS,
} from "store/types/posts";

export const setPosts = (payload) => {
  return {
    type: SET_POSTS,
    payload: payload,
  };
};

export const addPost = (payload) => {
  return {
    type: ADD_POST,
    payload: payload,
  };
};

export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload: payload,
  };
};

export const pushNewPosts = (payload) => {
  return {
    type: PUSH_NEW_POSTS,
    payload: payload,
  };
};

export const pushNewComments = (payload) => {
  return {
    type: PUSH_NEW_COMMENTS,
    payload: payload,
  };
};
