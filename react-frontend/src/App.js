import React, { Component } from 'react';
import './App.css';


const getCard = () => fetch('http://localhost:8000/card', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}).then(response => response.json());


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {card: ""};
  }

  componentDidMount() {
    getCard().then(card => this.setState({card: card["result"]}))

  }

  render() {
    return (
      <div className="App" >
        <header className="App-header" >
          {`Hebrew Word: ${this.state.card[1]}`}
          {`English Word: ${this.state.card[0]}`}
        </header >
      </div >
    );
  }
}

export default App;
