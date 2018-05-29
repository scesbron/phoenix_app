import React from "react";
import PropTypes from "prop-types";

class UserMessage extends React.Component {
  render() {
    const { fromServer, username, message } = this.props;
    const className = fromServer
      ? "user-message user-message-server"
      : "user-message user-message-local";
    return (
      <div className={className}>
        <div className="user-message-title">{username}</div>
        <div className="user-message-text">{message}</div>
      </div>
    );
  }
}

UserMessage.propTypes = {
  fromServer: PropTypes.bool,
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default UserMessage;
