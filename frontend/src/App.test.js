import React from 'react';
import App from './App';
import TestRenderer from 'react-test-renderer';

describe('App', () => {
  it('should show cards in hebrew by default', () => {
    const wrapper = TestRenderer.create(<App />).root;
    expect(wrapper.instance.state.displayedLanguage).toEqual('hebrew');
  });

  xit('should set english, hebrew, and word id in state after getting card', () => {
    const testRenderer = TestRenderer.create(<App />);
    const testInstance = testRenderer.getInstance();
    const value = {
      result: JSON.stringify({
        english: 'english word',
        hebrew: 'hebrew word',
        wordId: '123'
      })
    };

    const mockDisplayCard = jest.fn();
    const mockGetCard = jest
      .fn()
      .mockImplementation(() => Promise.resolve(value));

    testInstance.getCard = mockGetCard;
    testInstance.dispayCard = mockDisplayCard;

    testInstance.updateDisplayedCard();

    expect(mockGetCard).toHaveBeenCalledTimes(1);
    expect(mockDisplayCard).toHaveBeenCalledTimes(1);
    expect(testInstance.instance.state.english).toEqual('english word');
    expect(testInstance.instance.state.hebrew).toEqual('hebrew word');
    expect(testInstance.instance.state.wordId).toEqual('123');
  });

  it('should toggle language of revealed word on flipCard()', () => {
    const root = TestRenderer.create(<App />).root;
    const instance = root.instance;
    instance.setState({
      english: 'an english word',
      hebrew: 'a hebrew word',
      wordId: '',
      displayedLanguage: 'hebrew',
      hiddenLanguage: 'english',
      isRevealed: false,
      displayedWord: '',
      defaultDisplayedLanguage: 'hebrew'
    });

    root.instance.displayCardFaceUp();

    // Original state
    expect(instance.state.isRevealed).not.toBeTruthy();
    expect(instance.state.displayedWord).toEqual('a hebrew word');

    // Flipped over to reveal English word
    root.findByProps({ text: 'Reveal' }).props.onClick();

    expect(instance.state.isRevealed).toBeTruthy();
    expect(instance.state.displayedWord).toEqual('an english word');

    // Flipped back over to display Hebrew word
    root.findByProps({ text: 'Reveal' }).props.onClick();

    expect(instance.state.isRevealed).not.toBeTruthy();
    expect(instance.state.displayedWord).toEqual('a hebrew word');
  });

  it('should toggle default language of revealed word on toggleDisplayedLanguage', () => {
    const root = TestRenderer.create(<App />).root;
    const instance = root.instance;
    instance.setState({
      english: 'an english word',
      hebrew: 'a hebrew word',
      wordId: '',
      displayedLanguage: 'hebrew',
      hiddenLanguage: 'english',
      isRevealed: false,
      displayedWord: '',
      defaultDisplayedLanguage: 'hebrew'
    });

    root.instance.displayCardFaceUp();

    // Original state
    expect(instance.state.isRevealed).not.toBeTruthy();
    expect(instance.state.displayedWord).toEqual('a hebrew word');

    root.findByProps({ text: 'English <-> Hebrew' }).props.onClick();

    // Flip card over but don't mark it as "revealed" bc it's now the default
    expect(instance.state.isRevealed).not.toBeTruthy();
    expect(instance.state.displayedWord).toEqual('an english word');

    // Flipped back over to display Hebrew word, now it's "revealed"
    root.findByProps({ text: 'Reveal' }).props.onClick();

    expect(instance.state.isRevealed).toBeTruthy();
    expect(instance.state.displayedWord).toEqual('a hebrew word');

    // Flipped back over to display English word, now it's "revealed"
    root.findByProps({ text: 'Reveal' }).props.onClick();

    expect(instance.state.isRevealed).not.toBeTruthy();
    expect(instance.state.displayedWord).toEqual('an english word');
  });
});
