import React from "react";
import { Link } from "react-router-dom";
import Column from "../components/Column";

class Home extends React.Component {
  render() {
    return (
      <div className="main-wrapper">
        <div className="header">
          <h1 className="header-title">Dashboard</h1>
          <Link to="/">Accueil</Link>
        </div>
        <div className="dashboard">
          <Column title="A rencontrer" />
          <Column title="Entretien" />
        </div>
      </div>
    );
  }
}

export default Home;
