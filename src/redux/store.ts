import { combineReducers, createStore } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";

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

const fbConfig = {};

// firebase.initializeApp(fbConfig);

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
});

export default createStore(rootReducer, {});
