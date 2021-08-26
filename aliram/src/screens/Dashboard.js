import { useRequest } from "common/hooks/useRequest";
import Header from "components/Header/Header";
import Loader from "components/Loader/Loader";
import Post from "components/Post/Post";
import PostForm from "components/PostForm/PostForm";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiCreatePost,
  apiFetchNewPosts,
  apiFetchPosts,
} from "request/api/postApi";
import {
  addComment,
  addPost,
  pushNewPosts,
  setPosts,
} from "store/actions/posts";
import axios from "axios";
import { telegramBaseURL } from "request/request";

const Dashboard = ({ socket, ...props }) => {
  const dispatch = useDispatch();
  const { posts, next } = useSelector((state) => state.posts);

  useEffect(() => {
    socket.on("post", (data) => {
      dispatch(addPost(data));
    });
  }, [socket]);

  const [image, setImage] = useState("");

  useEffect(() => {
    const func = async () => {
      const res = await axios.get("https://randomuser.me/api/?results=50");
      setImage(res.data?.results);
    };
    func();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(addComment({ id: data.id, comment: data.comment }));
    });
  }, [socket]);

  const onSuccess = (res) => {
    dispatch(setPosts({ posts: res.data.posts, next: res.data.next }));
  };
  const onSuccessPost = (res) => {
    dispatch(addPost(res.data.post));
    socket.emit("post", res.data.post);
    setData("");
  };
  const onSuccessNewPost = (res) => {
    dispatch(pushNewPosts({ posts: res.data.posts, next: res.data.next }));
  };

  const fetchPosts = useRequest(() => apiFetchPosts(), {
    onSuccess: onSuccess,
  });

  const loadNewPosts = useRequest(() => apiFetchNewPosts(next), {
    onSuccess: onSuccessNewPost,
  });

  const [data, setData] = useState("");

  const createNewPost = useRequest(
    () =>
      apiCreatePost({
        text: data,
      }),
    { onSuccess: onSuccessPost }
  );

  useEffect(() => {
    fetchPosts.exec();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid main-grid mt-4 mb-4">
        <Header>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-5">
                <PostForm
                  createNewPost={createNewPost}
                  data={data}
                  setData={setData}
                />
              </div>
            </div>
          </div>
        </Header>
        <div className="row">
          {fetchPosts.status.isPending() ? (
            <div className="loader-wrapper">
              <Loader />
            </div>
          ) : (
            <Fragment>
              {createNewPost.status.isPending() && (
                <div className="loader-wrapper">
                  <Loader />
                </div>
              )}

              {posts.map((item, index) => (
                <div className="col-12 col-lg-6 mt-4">
                  <Post
                    socket={socket}
                    post={item}
                    index={index}
                    image={image}
                  />
                </div>
              ))}
            </Fragment>
          )}
        </div>
        <div className="mt-5 mb-5 text-center">
          {next && (
            <span className="load-more" onClick={() => loadNewPosts.exec()}>
              Daha çox yüklə
            </span>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
