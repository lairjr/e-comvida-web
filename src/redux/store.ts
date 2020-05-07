import { combineReducers, createStore } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

interface Todo {
  text: string;
  completed: boolean;
}

interface Schema {
  todos: Todo;
}

interface RootState {
  firebase: FirebaseReducer.Reducer<{}, Schema>; // The empyt object is for profile data type
}

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
});

export default createStore(rootReducer, composeWithDevTools());
