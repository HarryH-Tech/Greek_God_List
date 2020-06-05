import React from "react";

import GodList from "./components/GodList";
import Header from "./components/Header";
import AddGod from "./components/AddGod";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/list" component={GodList} />
          <Route exact path="/add_god" component={AddGod} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
