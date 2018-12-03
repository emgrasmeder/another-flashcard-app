import React, { Component } from 'react';
import './Home.css';
import Button from "./Button";


class App extends Component {
  constructor(props) {
    super(props);
    this.getCard = this.getCard.bind(this)
    this.updateDisplayedCard = this.updateDisplayedCard.bind(this)
    this.state = {
      english: "",
      hebrew: ""
    };
  }

  componentDidMount() {
    this.updateDisplayedCard()
  }

  updateDisplayedCard() {
    this.getCard().then(card => this.setState({
      english: card["result"][0],
      hebrew: card["result"][1],
    }))
  }

  getCard = () => fetch('http://localhost:8000/card', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());

  render() {
    return (
      <div className="Main" >
        <header className="Header" >
          {`Hebrew Word: ${this.state.hebrew}`}
          {`English Word: ${this.state.english}`}
        </header >
        <Button text="Reveal" />
        <Button text="English <-> Hebrew" />
        <div className="Feedback-Buttons" >
          <Button
            text="I knew it"
            onClick={this.updateDisplayedCard} />
          <Button
            text="Didn't know it"
            onClick={this.updateDisplayedCard} />
        </div >
      </div >
    );
  }
}

export default App;
