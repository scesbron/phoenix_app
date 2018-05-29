import React from "react";
import PropTypes from "prop-types";

export default class Column extends React.Component {
  render() {
    const { isDraggingOver, title, children } = this.props;
    return (
      <div className="column">
        <div className="column-header">
          <div className="column-header-title">{title}</div>
        </div>
        <div className={`column-content ${isDraggingOver ? "column-content-over" : ""}`}>
          {children}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  isDraggingOver: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};
