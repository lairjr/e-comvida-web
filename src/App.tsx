import React from "react";
import "./App.css";
import NavBar from "./common/NavBar";
import Map from "./map/Map";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Map />
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
