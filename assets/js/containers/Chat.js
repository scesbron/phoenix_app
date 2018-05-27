import React from "react";
import { Link } from "react-router-dom";
import { Socket } from "phoenix";
import UserMessage from "../components/UserMessage";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      inputMessage: "",
      user: "",
      userMessages: []
    };
    let socket = new Socket("/socket", {
      params: { token: window.userToken }
    });
    socket.connect();

    this.channel = socket.channel("room:lobby", {});
  }

  componentDidMount() {
    this.channel.join().receive("ok", response => {
      console.log("Joined successfully", response);
    });
    this.channel.on("new_msg", payload => {
      const exists = this.state.userMessages.find(
        msg => msg.user === payload.body.user && msg.message === payload.body.message
      );
      if (!exists) {
        this.setState({
          userMessages: this.state.userMessages.concat(payload.body)
        });
      }
    });
  }

  handleMessageInput(event) {
    this.setState({
      inputMessage: event.target.value
    });
  }

  handleUserInput(event) {
    this.setState({
      user: event.target.value
    });
  }

  handleSubmit(event) {
    const message = {
      user: this.state.user || "Anonyme",
      message: this.state.inputMessage
    };
    event.preventDefault();
    this.channel.push("new_msg", { body: message });
    this.setState({
      userMessages: this.state.userMessages.concat(message),
      inputMessage: ""
    });
  }

  render() {
    const { userMessages } = this.state;
    return (
      <div className="main-wrapper">
        <div className="header">
          <h1 className="header-title">Chat</h1>
          <Link to="/">Accueil</Link>
        </div>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-row">
              <label className="form-label">Utilisateur</label>
              <div className="control">
                <input
                  className="form-input"
                  type="text"
                  value={this.state.user}
                  onChange={this.handleUserInput.bind(this)}
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Message</label>
              <div className="control">
                <input
                  className="form-input"
                  type="text"
                  value={this.state.inputMessage}
                  onChange={this.handleMessageInput.bind(this)}
                />
              </div>
            </div>
            <button type="submit" value="Submit" className="button is-primary">
              Submit
            </button>
            {userMessages.map((message, index) => (
              <UserMessage
                key={index}
                username={message.user}
                message={message.message}
                fromServer={message.user !== this.state.user}
              />
            ))}
          </form>
        </div>
      </div>
    );
  }
}
