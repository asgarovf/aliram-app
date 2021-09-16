import ProfileImage from "assets/images/profile.png";
import axios from "axios";
import SellingButton from "components/SellingButton/SellingButton";

import { dateDifference } from "utils/dateDifference";
import { ReactComponent as ChevronDown } from "assets/icons/chevron_down.svg";
import { ReactComponent as ChevronUp } from "assets/icons/chevron_up.svg";
import { Fragment } from "react";
import { useRequest } from "common/hooks/useRequest";
import { apiDeletePost } from "request/api/postApi";
import { useDispatch } from "react-redux";
import { setPosts } from "store/actions/posts";
import { useSelector } from "react-redux";
import ProfileImg from "assets/images/a-circle.png";

const PostHeader = ({
  post,
  commentRef,
  index,
  image,
  active,
  setActive,
  password,
  setPassword,
}) => {
  const { posts, next } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const deletePostReq = useRequest(() => apiDeletePost(post._id), {
    onSuccess: () => {
      dispatch(
        setPosts({
          posts: posts?.filter((item) => item._id != post._id),
          next: next,
        })
      );
      alert("Post deleted");
    },
  });

  return (
    <div className="post-header">
      <div className="post-headline">
        <div className="d-flex align-items-center">
          <div className="blue-circle"></div>
          <div className="profile-picture">
            <img
              src={ProfileImg}
              height="32"
              width="32"
              alt=""
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>
            <span className="post-name">{post?.text}</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center relative">
          <div className="down-icon" onClick={() => setActive(!active)}>
            {active ? <ChevronUp /> : <ChevronDown />}
          </div>
          <SellingButton
            title={"Satıram"}
            onClick={() => {
              setActive(true);
              commentRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
              setTimeout(() => {
                commentRef?.current?.focus();
              }, 300);
            }}
          />
        </div>
      </div>
      <div className="post-content">
        {/* <span className="post-text">{post?.text}</span> */}
      </div>
      <div className="post-details">
        <span className="post-date">{dateDifference(post?.date_created)}</span>
        <div className="vertical-line"></div>
        <span className="post-comments-count">
          {post.comments_count || 0} şərh
        </span>

        {password === process.env.REACT_APP_PASSWORD_NAME && (
          <Fragment>
            <div className="vertical-line"></div>
            <span
              onClick={() => deletePostReq.exec()}
              className="post-comments-count delete"
            >
              Sil
            </span>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
