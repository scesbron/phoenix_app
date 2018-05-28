import React from "react";

export default class Column extends React.Component {
  render() {
    return (
      <div className="column">
        <div className="column-header">
          <div className="column-header-title">{this.props.title}</div>
        </div>
        <div className="column-content">{this.props.children}</div>
      </div>
    );
  }
}
