// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import CognitoLogin from './CognitoLogin';
import _ from 'lodash';
import { ICognitoLoginState } from './CognitoLogin';

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
  beforeAll(() => {
    jest.setTimeout(10000);
  });

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
      expect(child.props.title).toBe('MyTitle');
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

    it('Error label should contain `No userPool`', async (done) => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      const child = wrapper.root.findByProps({ iconName: 'sign-in' });
      await child.props.onPress();

      const errorLabel = wrapper.root.findByProps({ isCaption: true });
      expect(errorLabel.props.children).toBe('No userPool');
      done();
    });

    describe('formState Register', () => {
      it('`onRegister` should set `state.formState` to `Register`', async (done) => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const child = wrapper.root.findByProps({ title: 'Register' });
        await child.props.onPress();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('Register');
        done();
      });

      it('On save user failed `state.formState` should be `Register`', async (done) => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'Register',
          code: 'testcode',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({ title: 'Save' });
        await child.props.onPress();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('Register');
        done();
      });

      it('Cancel button should set `formState` to `Login`', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        wrapper.root.instance.setState({ formState: 'Register' });
        const child = wrapper.root.findByProps({ title: 'Cancel' });
        child.props.onPress();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('Login');
      });
    });

    describe('formState ConfirmAccount', () => {
      it('When formState `ConfirmAccount` `onCodeChanged` should set `state.code`', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        wrapper.root.instance.setState({ formState: 'ConfirmAccount' });
        const child = wrapper.root.findByProps({
          testID: 'ConfirmAccountForm',
        });
        child.props.onCodeChanged('testcode');
        const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

        expect(result).toBe('testcode');
      });

      it('When formState `ConfirmAccount` `onConfirmPress` should return `Not a valid Code`', async (done) => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'ConfirmAccount',
          code: 'testcode',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'ConfirmAccountForm',
        });
        await child.props.onConfirmPress();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'result',
          'error',
          'message',
        ]);
        console.log('*** test result ', result);
        expect(result).toBe('Not a valid Code');
        console.log('**** onConfirmPress test DONE *****');
        done();
      });
    });

    it('When formState `ConfirmMFALogin` `onCodeChanged` should set `state.code`', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      wrapper.root.instance.setState({ formState: 'ConfirmAccount' });
      const child = wrapper.root.findByProps({
        testID: 'ConfirmAccountForm',
      });
      child.props.onCodeChanged('testcode');
      const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

      expect(result).toBe('testcode');
    });
  });
});
