import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Map from "./pages/map/Map";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./pages/list/List";

function App() {
  return (
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
  );
}

export default App;
