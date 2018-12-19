// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import CognitoLogin from './CognitoLogin';
import _ from 'lodash';

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

    it('`loginButtonProps` should set button title', () => {
      const wrapper = TestRenderer.create(
        <CognitoLogin loginButtonProps={{ title: 'MyTitle' }} />
      );

      const child = wrapper.root.findByProps({ iconName: 'sign-in' });
      expect(child.props.title).toBe('MyTitle')
    });

    it('`onEmailChanged` should update state', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);

      const expectedEmail = 'bogus@stuff.com';
      wrapper.root.instance.onEmailChanged(expectedEmail);

      expect(wrapper.root.instance.state.userInput.email).toBe(expectedEmail);
    });

    it('`onPasswordChanged` should update state', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);

      const expectedPassword = 'sup3rSecre7';
      wrapper.root.instance.onPasswordChanged(expectedPassword);

      expect(wrapper.root.instance.state.userInput.password).toBe(
        expectedPassword
      );
    });

    it('`onPhoneChanged` should update state', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);

      const expectedInput = '07304655556';
      wrapper.root.instance.onPhoneChanged(expectedInput);

      expect(wrapper.root.instance.state.userInput.phone).toBe(expectedInput);
    });

    it('`onLogin` should set `state.result` to defined value', async (done) => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      const child = wrapper.root.findByProps({ iconName: 'sign-in' });
      await child.props.onPress();
      const result = _.get(wrapper, ['root', 'instance', 'state', 'result']);

      expect(result).not.toBeUndefined();
      done();
    });

    it('`onRegister` should set `state.formState` to `Register`', async (done) => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      const child = wrapper.root.findByProps({ title: 'Register' });
      await child.props.onPress();
      const result = _.get(wrapper, ['root', 'instance', 'state', 'formState']);

      expect(result).toBe('Register');
      done();
    });
  });
});
