import React, { Component } from 'react';
import './Home.css';
import Button from "./Button";


class App extends Component {
  constructor(props) {
    super(props);
    this.getCard = this.getCard.bind(this)
    this.updateDisplayedCard = this.updateDisplayedCard.bind(this)
    this.toggleDisplayedLanguage = this.toggleDisplayedLanguage.bind(this)
    this.revealAnswer = this.revealAnswer.bind(this)
    this.state = {
      english: "",
      hebrew: "",
      displayedLanguage: "hebrew",
      displayedWord: ""
    };
  }

  componentDidMount() {
    this.updateDisplayedCard()
  }

  updateDisplayedCard() {
    this.getCard().then(card => this.setState({
      english: card["result"][0],
      hebrew: card["result"][1],
    })).then(() => {
      this.displayCard()
    })
  }

  toggleDisplayedLanguage() {
    const newLanguage = this.state.displayedLanguage === "hebrew" ? "english" : "hebrew";
    this.setState({ displayedLanguage: newLanguage })
  }

  displayCard() {
    const word = this.state.displayedLanguage === "english" ? this.state.english : this.state.hebrew
    this.setState({ displayedWord: word })
  }

  revealAnswer() {
    const word = this.state.displayedLanguage === "hebrew" ? this.state.english : this.state.hebrew
    this.setState({ displayedWord: word })
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
        <div >
          <header className="Header" >
            {this.state.displayedWord}
          </header >
          </div >
          <Button
            text="Reveal"
            onClick={this.revealAnswer} />
          <Button
            text="English <-> Hebrew"
            onClick={this.toggleDisplayedLanguage}
          />
          <div className="Feedback-Buttons" >
            <Button
              text="I knew it"
              onClick={this.updateDisplayedCard} />
            <Button
              text="Didn't know it"
              onClick={this.updateDisplayedCard} />
          </div >
        <div className="Subheader" >
          {`Display language: ${this.state.displayedLanguage}`}
        </div >
      </div >
    );
  }
}

export default App;
