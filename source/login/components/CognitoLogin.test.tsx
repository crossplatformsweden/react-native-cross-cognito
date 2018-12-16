// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import CognitoLogin from './CognitoLogin';

jest.unmock('react-native');
jest.unmock('./CognitoLogin');

// Default export requires this type of mocking
// jest.mock('react-native-stager', () => ({
//   __esModule: true,
//   Stage: 'View',
//   StageButtons: 'View',
//   StageProgress: 'View',
//   default: 'View',
// }));

describe('components', () => {
  describe('<CognitoLogin />', () => {
    it('Component should render', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('onEmailChanged should update state', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);

      const expectedEmail = 'bogus@stuff.com';
      wrapper.root.instance.onEmailChanged(expectedEmail);

      expect(wrapper.root.instance.state.userInput.email).toBe(expectedEmail);
    });

    it('onPasswordChanged should update state', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);

      const expectedPassword = 'sup3rSecre7';
      wrapper.root.instance.onPasswordChanged(expectedPassword);

      expect(wrapper.root.instance.state.userInput.password).toBe(
        expectedPassword
      );
    });

    // it('Should have paper <Button />', () => {
    //   const wrapper = TestRenderer.create(<ConfirmForm />);
    //   const child = wrapper.root.findByProps({ mode: 'text' });
    //   expect(child.type).toEqual('View');
    // });

    // it('<FontAwesomeButton /> onPress should be called', () => {
    //   let called = false;
    //   const onCalled = () => (called = !called);

    //   const wrapper = TestRenderer.create(<ConfirmForm />);
    //   const child = wrapper.root.findByProps({ name: 'map' });
    //   child.props.onPress();
    //   expect(called).toBeTruthy();
    // });
  });
});
