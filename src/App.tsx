import React, { lazy, Suspense } from "react";
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
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import Add from "./pages/add/Add";
import AdminWrapper from "./components/AdminWrapper";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#a05a86",
      main: "#893168",
      dark: "#5f2248",
      contrastText: "#FDFDFD",
    },
    secondary: {
      light: "#534858",
      main: "#281B2F",
      dark: "#1c1220",
      contrastText: "#FDFDFD",
    },
  },
  typography: {
    fontFamily: ['"Baloo Da 2", cursive'].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: "Baloo Da 2",
            src: `url('https://fonts.googleapis.com/css2?family=Baloo+Da+2&display=swap');`,
          },
        ],
      },
    },
  },
});

const AdminAdd = lazy(() => import("./pages/admin/Add"));

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
          <ThemeProvider theme={theme}>
            <div className="app">
              <NavBar />

              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/">
                    <List />
                  </Route>

                  <Route exact path="/about">
                    <About />
                  </Route>

                  <Route exact path="/add">
                    <Add />
                  </Route>

                  <Route exact path="/list">
                    <List />
                  </Route>

                  <Route exact path="/map">
                    <Map />
                  </Route>

                  <AdminWrapper>
                    <Route exact path="/admin/add">
                      <AdminAdd />
                    </Route>
                  </AdminWrapper>
                </Switch>
              </Suspense>

              <Footer />
            </div>
          </ThemeProvider>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
