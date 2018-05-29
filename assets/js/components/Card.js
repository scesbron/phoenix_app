import React from "react";
import PropTypes from "prop-types";

class Card extends React.Component {
  render() {
    const { isDragging, title, message } = this.props;
    return (
      <div className="card" style={{ opacity: isDragging ? "0.5" : "1" }}>
        <div className="card-header">
          <div className="card-header-title">{title}</div>
        </div>
        <div className="card-content">{message}</div>
      </div>
    );
  }
}

Card.propTypes = {
  isDragging: PropTypes.bool,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Card;
