import ProfileImage from "assets/images/profile.png";
import axios from "axios";
import SellingButton from "components/SellingButton/SellingButton";
import { useEffect, useState } from "react";
import { dateDifference } from "utils/dateDifference";

const PostHeader = ({ post, commentRef, index, image }) => {
  return (
    <div className="post-header">
      <div className="post-headline">
        <div className="d-flex align-items-center">
          <div className="blue-circle"></div>
          <div className="profile-picture">
            <img
              src={image[index]?.picture?.large || ProfileImage}
              height="32"
              width="32"
              alt=""
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>
            <span className="post-name">{post?.title || "İstifadəçi"}</span>
          </div>
        </div>
        <div>
          <SellingButton
            title={"Satıram"}
            onClick={() => {
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
        <span className="post-text">{post?.text}</span>
      </div>
      <div className="post-details">
        <span className="post-date">{dateDifference(post?.date_created)}</span>
        <div className="vertical-line"></div>
        <span className="post-comments-count">
          {post.comments_count || 0} şərh
        </span>
      </div>
    </div>
  );
};

export default PostHeader;
