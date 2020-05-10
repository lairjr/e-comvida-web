import { combineReducers, createStore, compose } from "redux";
import {
  firebaseReducer,
  FirebaseReducer,
  FirestoreReducer,
} from "react-redux-firebase";
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

export interface RootState {
  firebase: FirebaseReducer.Reducer<{}, Schema>; // The empyt object is for profile data type
  firestore: FirestoreReducer.Reducer;
}

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer as any,
});

const createStoreWithFirebase = compose(reduxFirestore(firebase, {}))(
  createStore
);

export default createStoreWithFirebase(rootReducer, composeWithDevTools());
