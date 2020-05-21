import { combineReducers, createStore, compose } from "redux";
import { FirestoreReducer } from "react-redux-firebase";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "../firebase";

export interface RootState {
  firestore: FirestoreReducer.Reducer;
}

const rootReducer = combineReducers<RootState>({
  firestore: firestoreReducer as any,
});

const createStoreWithFirebase = compose(reduxFirestore(firebase, {}))(
  createStore
);

export default createStoreWithFirebase(rootReducer, composeWithDevTools());
