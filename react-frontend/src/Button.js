import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button
        className={"Button"}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button >
    );
  }
}

export default Button;
