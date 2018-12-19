import React, { Component } from 'react';
import './Home.css';
import Button from "./Button";


class App extends Component {
  constructor(props) {
    super(props);
    this.getCard = this.getCard.bind(this)
    this.giveFeedbackCorrect = this.giveFeedbackCorrect.bind(this)
    this.giveFeedbackIncorrect = this.giveFeedbackIncorrect.bind(this)
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

  giveFeedbackCorrect = () => fetch('http://localhost:8000/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hebrew: this.state.hebrew,
      english: this.state.english,
      "correct?": true
    })
  }).then(_ => this.updateDisplayedCard());

  giveFeedbackIncorrect = () => fetch('http://localhost:8000/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hebrew: this.state.hebrew,
      english: this.state.english,
      "correct?": false
    })
  }).then(_ => this.updateDisplayedCard());


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
            onClick={this.giveFeedbackCorrect} />
          <Button
            text="Didn't know it"
            onClick={this.giveFeedbackIncorrect} />
        </div >
        <div className="Subheader" >
          {`Display language: ${this.state.displayedLanguage}`}
        </div >
      </div >
    );
  }
}

export default App;
