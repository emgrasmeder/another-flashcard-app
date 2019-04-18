import React, { Component } from 'react';
import './Home.css';
import Button from './Button';
import Search from './Search';
import './Card.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.getCard = this.getCard.bind(this);
    this.giveFeedback = this.giveFeedback.bind(this);
    this.updateDisplayedCard = this.updateDisplayedCard.bind(this);
    this.showMeThisAgain = this.showMeThisAgain.bind(this);
    this.toggleDefaultDisplayedLanguage = this.toggleDefaultDisplayedLanguage.bind(
      this
    );
    this.nextLanguage = this.nextLanguage.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.state = {
      english: '',
      hebrew: '',
      wordId: '',
      displayedLanguage: 'hebrew',
      hiddenLanguage: 'english',
      isRevealed: false,
      displayedWord: '',
      defaultDisplayedLanguage: 'hebrew'
    };
  }

  componentDidMount() {
    this.updateDisplayedCard();
  }

  nextLanguage(language) {
    return language === 'english' ? 'hebrew' : 'english';
  }

  updateDisplayedCard() {
    this.getCard().then(card => {
      card = JSON.parse(card.result);
      this.setState(
        {
          english: card.english,
          hebrew: card.hebrew,
          wordId: card.id
        },
        this.displayCardFaceUp
      );
    });
  }

  showMeThisAgain(timeframe = 'never'){
    return fetch('http://localhost:8000/feedback/frequency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timeframe: timeframe,
        wordId: this.state.wordId,
      })
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
        isKnown: isKnown,
        displayedLanguage: this.state.defaultDisplayedLanguage
      })
    }).then(this.updateDisplayedCard);
  }

  toggleDefaultDisplayedLanguage() {
    this.setState(
      {
        defaultDisplayedLanguage: this.nextLanguage(
          this.defaultDisplayedLanguage
        ),
        displayedLanguage: this.nextLanguage(this.state.displayedLanguage),
        hiddenLanguage: this.nextLanguage(this.state.hiddenLanguage)
      },
      this.displayCardFaceUp
    );
  }

  displayCardFaceUp() {
    this.setState({
      isRevealed: false,
      displayedWord: this.state[this.state.defaultDisplayedLanguage],
      displayedLanguage: this.state.defaultDisplayedLanguage,
      hiddenLanguage: this.nextLanguage(this.state.defaultDisplayedLanguage)
    });
  }

  flipCard() {
    const nextWord = this.state[
      this.nextLanguage(this.state.displayedLanguage)
    ];
    const nextDisplayedLanguage = this.nextLanguage(
      this.state.displayedLanguage
    );
    const nextHiddenLanguage = this.nextLanguage(this.state.hiddenLanguage);
    const nextRevealedState = !this.state.isRevealed;

    this.setState({
      isRevealed: nextRevealedState,
      displayedWord: nextWord,
      displayedLanguage: nextDisplayedLanguage,
      hiddenLanguage: nextHiddenLanguage
    });
  }

  getCard() {
    return fetch('http://localhost:8000/card', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  search(query) {
    return fetch(`http://localhost:8000/search?q=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(results => {
        JSON.parse(results.result);
      });
  }

  render() {
    return (
      <div className="Main">
        <div className={'CardHeader'}>
          <div className={'Card'}>
            <header className="Header">{this.state.displayedWord}</header>
          </div>
        </div>
        <Button text="Reveal" onClick={this.flipCard} />
        <Button
          text="English <-> Hebrew"
          onClick={this.toggleDefaultDisplayedLanguage}
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
        <div>
          <Search onClick={this.search} />
        </div>
        <div>
          <Button
            text="Don't show me this card again"
            onClick={() => this.showMeThisAgain('never')}
          />
        </div>
      </div>
    );
  }
}

export default App;
