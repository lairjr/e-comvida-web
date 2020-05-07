import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Map from "./pages/map/Map";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./pages/list/List";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        {...{ config: {}, dispatch: store.dispatch, firebase: firebase }}
      >
        <Router>
          <div className="app">
            <NavBar />

            <Switch>
              <Route exact path="/">
                <List />
              </Route>

              <Route exact path="/list">
                <List />
              </Route>

              <Route exact path="/map">
                <Map />
              </Route>
            </Switch>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
