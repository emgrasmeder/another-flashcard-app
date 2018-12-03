import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  handleClick = (response) => fetch('http://localhost:8000/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { response: response }
  }).then(response => response.json());

  render() {
    return (
      <button className={"Button"}
        onClick={this.handleClick}>
        {this.props.text}
      </button >
    );
  }
}

export default Button;
