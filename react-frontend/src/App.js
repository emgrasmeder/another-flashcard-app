import React, { Component } from 'react';
import './Home.css';
import Button from "./Button";


const getCard = () => fetch('http://localhost:8000/card', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}).then(response => response.json());


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { card: "" };
  }

  componentDidMount() {
    getCard().then(card => this.setState({ card: card["result"] }))
  }

  render() {
    return (
      <div className="Main" >
        <header className="Header" >
          {`Hebrew Word: ${this.state.card[1]}`}
          {`English Word: ${this.state.card[0]}`}
        </header >
          <Button text="Reveal" />
        <div className="Feedback-Buttons" >
          <Button text="I knew it" />
          <Button text="Didn't know it"/>
        </div >
      </div >
    )
      ;
  }
}

export default App;
