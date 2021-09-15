import { useRef, useState } from "react";
import "./Post.css";
import PostComments from "./PostComments";

import PostHeader from "./PostHeader";

const Post = ({ socket, post, index, image, password, setPassWord }) => {
  const commentRef = useRef(null);

  const [active, setActive] = useState(false);

  return (
    <div className="post-wrapper">
      <PostHeader
        password={password}
        setPassWord={setPassWord}
        post={post}
        commentRef={commentRef}
        index={index}
        image={image}
        active={active}
        setActive={setActive}
      />
      {active && (
        <PostComments socket={socket} post={post} commentRef={commentRef} />
      )}
    </div>
  );
};

export default Post;
