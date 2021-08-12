import Comment from "components/Comment/Comment";
import { ReactComponent as SendIcon } from "assets/icons/send.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import Ghost from "assets/images/ghost.png";
import { useRequest } from "common/hooks/useRequest";
import { apiCreateComment } from "request/api/commentApi";
import { useDispatch } from "react-redux";
import { addComment, pushNewComments } from "store/actions/posts";
import { apiPushNewComments } from "request/api/postApi";
import { dateDifference } from "utils/dateDifference";

const PostComments = ({ socket, post, commentRef }) => {
  const [comment, setComment] = useState("");
  const ref = useRef(null);
  const commentBoxRef = useRef(null);
  const dispatch = useDispatch();

  const [commentPage, setCommentPage] = useState(1);

  const onSuccess = (res) => {
    dispatch(addComment({ id: post?._id, comment: res.data.comment }));
    socket.emit("message", { id: post?._id, comment: res.data.comment });
    commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
    setComment("");
  };

  const onSuccessNewComments = (res) => {
    dispatch(
      pushNewComments({ comments: res.data.post?.comments, id: post?._id })
    );
    setCommentPage(commentPage + 1);
  };

  const addCommentRequest = useRequest(
    () => apiCreateComment(post?._id, comment),
    {
      onSuccess,
    }
  );

  const pushCommentRequest = useRequest(
    () => apiPushNewComments(post?._id, commentPage),
    { onSuccess: onSuccessNewComments }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addCommentRequest.exec();
  };

  const handleChange = (e) => {
    if (e.key == "Enter") {
      handleSubmit(e);
    } else {
      setComment(e.target.value);
    }
  };

  return (
    <div className="post-comments">
      <div
        ref={commentBoxRef}
        className={`post-comment-box ${
          post.comments.length === 0 ? "justify-content-center" : ""
        }`}
      >
        {post.comments.length !== 0 ? (
          <Fragment>
            {post?.comments?.map((item) => (
              <Comment comment={item} />
            ))}
            <Fragment>
              {post?.comments?.length !== 0 && (
                <Fragment>
                  {post.comments_count &&
                  post.comments_count > post.comments?.length ? (
                    <Fragment>
                      <div className="post-horizontal-line"></div>
                      <span
                        className="post-load-comments"
                        onClick={() => pushCommentRequest.exec()}
                      >
                        Daha çox şərh yüklə (
                        {post.comments_count - post.comments?.length})
                      </span>
                    </Fragment>
                  ) : null}
                </Fragment>
              )}
            </Fragment>
          </Fragment>
        ) : (
          <div className="d-flex flex-column align-items-center mt-3 mb-3">
            <img src={Ghost} width="114" height="114" alt="" />
            <span className="no-results">Şərh tapılmadı</span>
          </div>
        )}
      </div>

      <div className="post-comment-input-wrapper">
        <form onSubmit={handleSubmit} ref={ref}>
          <textarea
            ref={commentRef}
            value={comment}
            onChange={handleChange}
            onKeyDown={handleChange}
            className="post-comment-comment-textarea"
            placeholder="Şərh yaz..."
          />
          <button className="post-comment-send-button">
            <div className="send-icon">
              <SendIcon />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostComments;
