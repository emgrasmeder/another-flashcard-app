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

  it('should toggle language of revealed word on flipCardOver()', () => {
    const root = TestRenderer.create(<App />).root;
    const instance = root.instance;
    instance.setState({
      displayedLanguage: 'hebrew',
      english: 'an english word',
      hebrew: 'a hebrew word',
      isFlippedOver: false
    });

    root.instance.displayCard();

    // Original state
    expect(instance.state.displayedWord).toEqual('a hebrew word');
    expect(instance.state.isFlippedOver).toBe(false);

    root.findByProps({ text: 'Reveal' }).props.onClick();

    // Flipped over to reveal English word
    expect(instance.state.isFlippedOver).toBeTruthy();
    expect(instance.state.displayedWord).toEqual('an english word');

    root.findByProps({ text: 'Reveal' }).props.onClick();

    // Flipped back over to display Hebrew word
    expect(instance.state.isFlippedOver).toBe(false);
    expect(instance.state.displayedWord).toEqual('a hebrew word');
  });
});
