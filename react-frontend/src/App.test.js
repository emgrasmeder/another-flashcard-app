import React from 'react';
import App from "./App";
import TestRenderer from 'react-test-renderer';


describe('App', () => {
  it('should show cards in hebrew by default', () => {
    const wrapper = TestRenderer.create(<App />).root;
    expect(wrapper.instance.state.displayedLanguage).toEqual("hebrew");
  })
});
