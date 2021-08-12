import { useRef } from "react";
import "./Post.css";
import PostComments from "./PostComments";

import PostHeader from "./PostHeader";

const Post = ({ socket, post }) => {
  const commentRef = useRef(null);

  return (
    <div className="post-wrapper">
      <PostHeader post={post} commentRef={commentRef} />
      <PostComments socket={socket} post={post} commentRef={commentRef} />
    </div>
  );
};

export default Post;
