import "phoenix_html";
import css from "../css/app.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Chat from "./containers/Chat";
import Dashboard from "./containers/Dashboard";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/chat" component={Chat} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-app"));
