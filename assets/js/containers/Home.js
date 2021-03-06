import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="main-wrapper">
        <h1>Hello React!</h1>
        <div className="row">
          <div>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div>
            <Link to="/chat">Chat</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
