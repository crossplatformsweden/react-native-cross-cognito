// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import CognitoLogin from './CognitoLogin';
import _ from 'lodash';
import { ICognitoLoginState } from './ICognitoLoginState';
import OnForgotPassword from '../../events/OnForgotPassword';

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
    jest.resetAllMocks();
    jest.setTimeout(10000);
  });

  describe('<CognitoLogin />', () => {
    it('Component should render', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('`state.userInput` should be defined', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      expect(wrapper.root.instance.state.userInput).toBeDefined();
    });

    it('`state.userInput.email` should be `undefined`', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      expect(wrapper.root.instance.state.userInput.email).toBeUndefined();
    });

    it('`state.userInput.password` should be `undefined`', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      expect(wrapper.root.instance.state.userInput.password).toBeUndefined();
    });

    it('`state.userInput.formState` should be `Login`', () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      expect(wrapper.root.instance.state.formState).toBe('Login');
    });

    it('`loginButtonProps` should set button title', () => {
      const wrapper = TestRenderer.create(
        <CognitoLogin loginButtonProps={{ title: 'MyTitle' }} />
      );

      const child = wrapper.root.findByProps({ iconName: 'sign-in' });
      expect(child.props.title).toBe('MyTitle');
    });

    describe('Component state updates', () => {
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

        const expectedInput = '+07304655556';
        wrapper.root.instance.onPhoneChanged(expectedInput);

        expect(wrapper.root.instance.state.userInput.phone).toBe(expectedInput);
      });

      it('`onLogin` should set `state.result` to defined value', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const child = wrapper.root.findByProps({ iconName: 'sign-in' });
        await child.props.onPress();
        const result = _.get(wrapper, ['root', 'instance', 'state', 'result']);

        expect(result).not.toBeUndefined();
      });

      it('`Register` button should set `state.formState` to `Register`', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const child = wrapper.root.findByProps({ title: 'Register' });
        child.props.onPress();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('Register');
      });

      it('`Forgot password` button should set `formState` to `Forgot`', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const child = wrapper.root.findByProps({
          title: 'Forgot password',
        });
        child.props.onPress();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('Forgot');
      });

      it('`OnResetPassword` should set `formState` to `Login`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        await wrapper.root.instance.OnResetPassword();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('Login');
      });

      it('`ForgotPasswordAsync` should set `formState` to `NewPassword`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        await wrapper.root.instance.ForgotPasswordAsync('test@test.com');
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('NewPassword');
      });
    });

    it('Error label should contain `No userPool`', async () => {
      const wrapper = TestRenderer.create(<CognitoLogin />);
      const child = wrapper.root.findByProps({ iconName: 'sign-in' });
      await child.props.onPress();

      const errorLabel = wrapper.root.findByProps({ isCaption: true });
      expect(errorLabel.props.children).toBe('No userPool');
    });

    describe('formState Register', () => {
      it('On save user failed `state.formState` should be `Register`', async () => {
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
      it('`onCodeChanged` should set `state.code`', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        wrapper.root.instance.setState({ formState: 'ConfirmAccount' });
        const child = wrapper.root.findByProps({
          testID: 'ConfirmAccountForm',
        });
        child.props.onCodeChanged('testcode');
        const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

        expect(result).toBe('testcode');
      });

      it('`OnResendSignup` should pass', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'ConfirmAccount',
          result: undefined,
          code: undefined,
          userInput: { email: 'bogus@test.com', password: 'testPw' },
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          title: 'Resend code',
        });
        expect(child.props.onPress).not.toThrow();
      });

      it('On confirm account should set `formState` to `Login`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'ConfirmAccount',
          code: '12134243',
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
          'formState',
        ]);
        console.log('*** test result ', result);
        expect(result).toBe('Login');
        console.log('**** onConfirmPress test DONE *****');
      });

      it('When no `code` or `email` `onConfirmPress` should set `message` to `Need code and user e-mail`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'ConfirmAccount',
          code: undefined,
          userInput: { email: undefined, password: undefined },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'ConfirmAccountForm',
        });
        await child.props.onConfirmPress();
        const result = _.get(wrapper, ['root', 'instance', 'state', 'message']);
        console.log('*** test result ', result);
        expect(result).toBe('Need code and user e-mail');
        console.log('**** onConfirmPress test DONE *****');
      });
    });

    describe('formState ConfirmMFALogin', () => {
      it('`onCodeChanged` should set `state.code`', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        wrapper.root.instance.setState({ formState: 'ConfirmMFALogin' });
        const child = wrapper.root.findByProps({
          testID: 'ConfirmMFAForm',
        });
        child.props.onCodeChanged('testcode');
        const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

        expect(result).toBe('testcode');
      });

      it('`onConfirmPress` should return `Not a valid Code`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'ConfirmMFALogin',
          code: 'testcode',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'ConfirmMFAForm',
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
        expect(result).toBe('Not a valid Code');
      });

      it('When no `code` or `email` `onConfirmPress` should set `message` to `Please enter username and the code`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'ConfirmMFALogin',
          code: undefined,
          userInput: { email: undefined, password: 'testPw' },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'ConfirmMFAForm',
        });
        await child.props.onConfirmPress();
        const result = _.get(wrapper, ['root', 'instance', 'state', 'message']);
        expect(result).toBe('Please enter username and the code');
      });
    });

    describe('formState NewPassword', () => {
      it('`onCodeChanged` should set `state.code`', () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        wrapper.root.instance.setState({ formState: 'NewPassword' });
        const child = wrapper.root.findByProps({
          testID: 'PasswordForm',
        });
        child.props.onCodeChanged('testcode');
        const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

        expect(result).toBe('testcode');
      });

      it('On save password should set formState to `Login`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'NewPassword',
          result: undefined,
          code: '12345',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'PasswordForm',
        });
        await child.props.onSavePress();
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        expect(result).toBe('Login');
      });

      it('When no `code` or `email` `onSavePress` should set `message` to `Need code and user e-mail`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'NewPassword',
          code: undefined,
          userInput: { email: undefined, password: undefined },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'PasswordForm',
        });
        await child.props.onSavePress();
        const result = _.get(wrapper, ['root', 'instance', 'state', 'message']);
        expect(result).toBe('Please enter username, code and new password');
      });
    });

    describe('formState Forgot', () => {
      it('When no `code` or `email` `onSavePress` should set `message` to `Need code and user e-mail`', async () => {
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'Forgot',
          code: undefined,
          userInput: { email: undefined, password: undefined },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'ForgotForm',
        });
        await child.props.onSubmit();
        const result = _.get(wrapper, ['root', 'instance', 'state', 'message']);
        expect(result).toBe('Please enter username');
      });

      it('On forgot password should not throw', async () => {
        // Have to mock the alert dialog that occurs
        jest.mock('react-native', {
          Alert: { alert: OnForgotPassword('bogus@test.com') },
        });
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'Forgot',
          result: undefined,
          code: '12345',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({
          testID: 'ForgotForm',
        });
        expect(await child.props.onSubmit).not.toThrow();
      });

      it('ForgotPassword should set formState to `NewPassword`', async () => {
        // Have to mock the alert dialog that occurs
        jest.mock('react-native', {
          Alert: jest.fn,
        });
        const wrapper = TestRenderer.create(<CognitoLogin />);
        const state: ICognitoLoginState = {
          formState: 'Forgot',
          result: undefined,
          code: '12345',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
        };
        wrapper.root.instance.setState(state);
        await wrapper.root.instance.ForgotPasswordAsync('bogus@test.com');
        const result = _.get(wrapper, [
          'root',
          'instance',
          'state',
          'formState',
        ]);

        console.log('ForgotPassword result FormState: ', result);
        expect(result).toBe('NewPassword');
      });
    });
  });
});

// TODO: Test Register > Login flow (right form?)
