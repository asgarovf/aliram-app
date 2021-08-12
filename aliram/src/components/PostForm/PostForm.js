import "./PostForm.css";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

const PostForm = ({ createNewPost, data, setData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewPost.exec();
  };

  return (
    <form className="postform--input-wrapper" onSubmit={handleSubmit}>
      <div className="postform--input">
        <div className="postform--search-icon">
          <SearchIcon />
        </div>
        <input
          value={data}
          onChange={(e) => setData(e.target.value)}
          type="text"
          placeholder="Bu olsa..."
        />
      </div>
      <button type="submit" className="postform--submit-button">
        Alaram
      </button>
    </form>
  );
};

export default PostForm;
