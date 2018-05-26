import React from "react";
import { Link } from "react-router-dom";
import { Socket } from "phoenix";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      inputMessage: ""
    };
  }

  componentDidMount() {
    let socket = new Socket("/socket", { params: { token: window.userToken } });
    socket.connect();
    let channel = socket.channel("room:lobby", {});
    channel.join().receive("ok", response => {
      console.log("Joined successfully", response);
    });
  }

  handleInputMessage(event) {
    this.setState({
      inputMessage: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`Message : ${this.state.inputMessage}`);
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="header">
          <h1 className="header-title">Chat</h1>
          <Link to="/">Accueil</Link>
        </div>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="field">
              <label className="label">Utilisateur</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={this.state.inputMessage}
                  onChange={this.handleInputMessage.bind(this)}
                />
              </div>
            </div>
            <button type="submit" value="Submit" className="button is-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
