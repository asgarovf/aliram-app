import { combineReducers, createStore } from "redux";
import { postReducer } from "./reducers/posts";

const reducer = combineReducers({
  posts: postReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
