import React from "react";

class UserMessage extends React.Component {
  render() {
    return (
      <div className="user-message">
        <div className="user-message-title">{this.props.username}</div>
        <div className="user-message-text">{this.props.message}</div>
      </div>
    );
  }
}

export default UserMessage;
