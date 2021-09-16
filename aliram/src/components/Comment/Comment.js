import "./Comment.css";
import ProfileImage from "assets/images/s-circle.png";
import { dateDifference } from "utils/dateDifference";

const Comment = ({ comment }) => {
  const formatText = () => {
    const textArray = comment?.text?.split(" ")?.map((item) =>
      item?.includes("https://") || item?.includes("http://") ? (
        <a href={item} target="_blank">
          {item}
        </a>
      ) : (
        <span>{item}</span>
      )
    );

    return textArray;
  };

  return (
    <div className="comment-comment-wrapper">
      <div className="comment-comment-header">
        <img
          className="comment-image"
          src={ProfileImage}
          width="32"
          height="32"
        />
        <div className="d-flex flex-column">
          <span className="comment-comment-name">
            {formatText()?.map((item) => (
              <span>{item} </span>
            ))}
          </span>{" "}
          <span className="comment-comment-date">
            {" "}
            {dateDifference(comment?.date_created)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
