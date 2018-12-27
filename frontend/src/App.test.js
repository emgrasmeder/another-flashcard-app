import React from 'react';
import App from './App';
import TestRenderer from 'react-test-renderer';

describe('App', () => {
  it('should show cards in hebrew by default', () => {
    const wrapper = TestRenderer.create(<App />).root;
    expect(wrapper.instance.state.displayedLanguage).toEqual('hebrew');
  });

  it('should set english, hebrew, and word id in state after getting card', () => {
    const testRenderer = TestRenderer.create(<App />);
    const testInstance = testRenderer.getInstance();
    const value = {
      result: JSON.stringify({
        english: 'english word',
        hebrew: 'hebrew worasdasdd',
        wordId: '123'
      })
    };

    const mockSetState = jest.fn((d, x) => x());
    const mockDisplayCard = jest.fn();
    const mockGetCard = jest
      .fn()
      .mockImplementation(() => Promise.resolve(value));

    testInstance.setState = mockSetState;
    testInstance.getCard = mockGetCard;
    testInstance.dispayCard = mockDisplayCard;

    testInstance.updateDisplayedCard();

    expect(mockGetCard).toHaveBeenCalledTimes(1);
    expect(mockDisplayCard).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(testInstance.instance.state).toEqual('english word');
    expect(testInstance.instance.state.english).toEqual('english word');
    expect(testInstance.instance.state.hebrew).toEqual('hebrew word');
    expect(testInstance.instance.state.wordId).toEqual('123');
  });

  xit('should flip card over on revealAnswer()', () => {
    const root = TestRenderer.create(<App />).root;
    const instance = root.instance;
    instance.setState({ english: 'an english world', hebrew: 'a hebrew word' });

    expect(instance.state.displayedWord).toEqual('a hebrew word');
    root.findByProps({ text: 'Reveal' }).props.onClick();

    root.findByProps({ text: 'Reveal' }).props.onClick();
    expect(instance.state.displayedWord).toEqual('an english word');

    root.findByProps({ text: 'Reveal' }).props.onClick();
    expect(instance.state.displayedWord).toEqual('a hebrew word');
  });
});
