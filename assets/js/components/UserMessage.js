import React from "react";

class UserMessage extends React.Component {
  render() {
    const className = this.props.fromServer
      ? "user-message user-message-server"
      : "user-message user-message-local";
    return (
      <div className={className}>
        <div className="user-message-title">{this.props.username}</div>
        <div className="user-message-text">{this.props.message}</div>
      </div>
    );
  }
}

export default UserMessage;
