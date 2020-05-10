import { combineReducers, createStore, compose } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "../firebase";

interface Todo {
  text: string;
  completed: boolean;
}

interface Schema {
  todos: Todo;
}

interface RootState {
  firebase: FirebaseReducer.Reducer<{}, Schema>; // The empyt object is for profile data type
  firestore: any;
}

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const createStoreWithFirebase = compose(reduxFirestore(firebase, {}))(
  createStore
);

export default createStoreWithFirebase(rootReducer, composeWithDevTools());
