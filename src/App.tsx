import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Map from "./pages/map/Map";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./pages/list/List";
import { Provider } from "react-redux";
import store from "./redux/store";
import firebase from "./firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import About from "./pages/about/About";

function App() {
  const rrfProps = {
    firebase,
    config: {
      userProfile: "users",
      useFirestoreForProfile: true,
    },
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div className="app">
            <NavBar />

            <Switch>
              <Route exact path="/">
                <List />
              </Route>

              <Route exact path="/about">
                <About />
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
