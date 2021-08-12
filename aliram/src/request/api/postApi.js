import { POSTS } from "common/constants/endpoints";
import axiosInstance from "request/request";

export const apiFetchPosts = () => axiosInstance({ method: "get", url: POSTS });

export const apiFetchNewPosts = (url) =>
  axiosInstance({ method: "get", url: url });

export const apiCreatePost = (body) =>
  axiosInstance({ method: "post", url: POSTS, data: body });

export const apiPushNewComments = (postId, commentPage) =>
  axiosInstance({
    method: "get",
    url: `${POSTS + "id/" + postId + "/" + commentPage}`,
  });
