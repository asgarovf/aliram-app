import { COMMENTS } from "common/constants/endpoints";
import axiosInstance from "request/request";

export const apiCreateComment = (postId, text) =>
  axiosInstance({ method: "post", url: COMMENTS + postId, data: { text } });
