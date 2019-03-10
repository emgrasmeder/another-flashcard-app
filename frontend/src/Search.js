import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="Search">
        <Button
          text="Search"
          onClick={() => this.props.onClick(this.state.value)}
        />
        <input
          type="text"
          name="Search"
          placeholder="Search for words"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func
};

Search.defaultProps = {
  onClick: e => e
};

export default Search;
