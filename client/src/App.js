import React from "react";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AdminGodList from "./components/admin/AdminGodList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import AddGod from "./components/admin/AddGod";
import UserGodList from "./components/user/UserGodList";

import UserRoute from "./custom_routes/UserRoute";
import AdminRoute from "./custom_routes/AdminRoute";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";

import "./App.css";

const HeaderWithRouter = withRouter(({ location }) => <Header />);

function App() {
  return (
    <Router>
      <HeaderWithRouter />
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <AdminRoute exact path="/admin_god_list" component={AdminGodList} />
        <AdminRoute exact path="/add_god" component={AddGod} />
        <UserRoute exact path="/user_god_list" component={UserGodList} />
        <Redirect
          from="*"
          to="/PageNotFound"
          path="/PageNotFound"
          component={PageNotFound}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
