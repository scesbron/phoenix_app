import React from "react";
import PropTypes from "prop-types";

class Card extends React.Component {
  render() {
    const { title, message } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">{title}</div>
        </div>
        <div className="card-content">{message}</div>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Card;
