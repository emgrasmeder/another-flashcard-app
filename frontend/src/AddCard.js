import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            english: '',
            hebrew: ''
        };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    insert(query) {
        return fetch(`http://localhost:8000/insert`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                english: query.english,
                hebrew: query.hebrew,
            })
        })
            .then(response => response.json());
    }


    render() {
        return (
            <div className="AddWord">
                <Button
                    text="Add Word to Deck"
                    onClick={() => this.insert({
                        english: this.state.english,
                        hebrew: this.state.hebrew
                    })}
                />
                <input
                    type="text"
                    name="english"
                    placeholder="English"
                    value={this.state.english}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="hebrew"
                    placeholder="Hebrew"
                    value={this.state.hebrew}
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
