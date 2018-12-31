import React, { Component } from 'react';
import './Home.css';
import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.getCard = this.getCard.bind(this);
    this.giveFeedback = this.giveFeedback.bind(this);
    this.updateDisplayedCard = this.updateDisplayedCard.bind(this);
    this.toggleDisplayedLanguage = this.toggleDisplayedLanguage.bind(this);
    this.flipCardOver = this.flipCardOver.bind(this);
    this.state = {
      english: '',
      hebrew: '',
      wordId: '',
      displayedLanguage: 'hebrew',
      hiddenLanguage: 'english',
      isFlippedOver: false,
      displayedWord: ''
    };
  }

  componentDidMount() {
    this.updateDisplayedCard();
  }

  updateDisplayedCard() {
    this.getCard()
      .then(card => {
        card = JSON.parse(card.result);
        this.setState({
          english: card.english,
          hebrew: card.hebrew,
          wordId: card.id
        }, this.displayCard);
      });
  }

  giveFeedback(isKnown) {
    return fetch('http://localhost:8000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timestamp: Math.floor(new Date() / 1000),
        wordId: this.state.wordId,
        isKnown: isKnown
      })
    }).then(this.updateDisplayedCard);
  }

  toggleDisplayedLanguage() {
    const newLanguage =
      this.state.displayedLanguage === 'hebrew' ? 'english' : 'hebrew';
    this.setState({ displayedLanguage: newLanguage });
  }

  displayCard() {
    const word =
      this.state.displayedLanguage === 'english'
        ? this.state.english
        : this.state.hebrew;
    this.setState({ displayedWord: word });
  }

  flipCardOver() {
    if (this.state.isFlippedOver) {
      this.setState({ 
        isFlippedOver: false,
        displayedWord: this.state[this.state.displayedLanguage] });
    } else {
      this.setState({ 
        isFlippedOver: true, 
        displayedWord: this.state[this.state.hiddenLanguage] });
    } 
  }

  getCard() {
    return fetch('http://localhost:8000/card', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  render() {
    return (
      <div className="Main">
        <div>
          <header className="Header">{this.state.displayedWord}</header>
        </div>
        <Button text="Reveal" onClick={this.flipCardOver} />
        <Button
          text="English <-> Hebrew"
          onClick={this.toggleDisplayedLanguage}
        />
        <div className="Feedback-Buttons">
          <Button text="I knew it" onClick={() => this.giveFeedback(true)} />
          <Button
            text="Didn't know it"
            onClick={() => this.giveFeedback(false)}
          />
        </div>
        <div className="Subheader">
          {`Display language: ${this.state.displayedLanguage}`}
        </div>
      </div>
    );
  }
}

export default App;
