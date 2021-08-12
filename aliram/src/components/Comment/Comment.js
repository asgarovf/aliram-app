import "./Comment.css";
import ProfileImage from "assets/images/profile.png";
import { dateDifference } from "utils/dateDifference";

const Comment = ({ comment }) => {
  return (
    <div className="comment-comment-wrapper">
      <div className="comment-comment-header">
        <img src={ProfileImage} width="32" height="32" />
        <span className="comment-comment-name">
          {comment?.title || "İstifadəçi"}
        </span>
      </div>
      <span className="comment-comment-text">{comment?.text}</span>
      <span className="comment-comment-date">
        {" "}
        {dateDifference(comment?.date_created)}
      </span>
    </div>
  );
};

export default Comment;
