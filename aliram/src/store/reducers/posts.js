import {
  ADD_COMMENT,
  ADD_POST,
  PUSH_NEW_COMMENTS,
  PUSH_NEW_POSTS,
  SET_POSTS,
} from "store/types/posts";

const initialState = {
  next: null,
  posts: [],
};

const doesContain = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i]?._id === item?._id) {
      return true;
    }
  }
  return false;
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      const payload = { ...state };
      payload.posts = [...action.payload.posts];
      payload.next = action.payload.next;
      return payload;
    }
    case ADD_POST: {
      const payload = { ...state };
      const posts = [...payload.posts];
      const newPost = { ...action.payload };

      newPost.comments_count = 0;

      posts.unshift(newPost);
      payload.posts = posts;
      return payload;
    }
    case ADD_COMMENT: {
      const payload = { ...state };
      const posts = [...payload.posts];

      for (let i = 0; i < posts.length; i++) {
        if (posts[i]._id === action.payload.id) {
          posts[i].comments.push(action.payload.comment);
          posts[i].comments_count++;
        }
      }
      payload.posts = posts;
      /*  post.comments.unshift(action.payload.comment); */
      return payload;
    }
    case PUSH_NEW_POSTS: {
      const payload = { ...state };
      const posts = [...payload.posts];
      action.payload.posts.map((item) => posts.push(item));
      payload.posts = posts;
      payload.next = action.payload.next;
      return payload;
    }
    case PUSH_NEW_COMMENTS: {
      const payload = { ...state };
      const posts = [...payload.posts];
      for (let i = 0; i < posts.length; i++) {
        if (posts[i]._id === action.payload.id) {
          action.payload.comments.map((item) => {
            console.log(doesContain(posts[i].comments, item));
            if (!doesContain(posts[i].comments, item)) {
              posts[i].comments.push(item);
            }
          });
        }
      }
      payload.posts = posts;
      return payload;
    }
    default: {
      return state;
    }
  }
};
