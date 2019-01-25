// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import _ from 'lodash';
import { ICognitoLoginState } from './ICognitoLoginState';
import OnForgotPassword from '../../events/OnForgotPassword';
import { ICognitoLoginProps } from './ICognitoLoginProps';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

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
    beforeAll(() => {
      jest.unmock('react-native');
      jest.unmock('./CognitoLogin');

      jest.setTimeout(10000);
    });

    const GetDefaultCognitoLogin = async (
      props?: ICognitoLoginProps | undefined
    ) => {
      const { CognitoLogin } = await import('./CognitoLogin');
      const wrapper = TestRenderer.create(<CognitoLogin {...props} />);
      return wrapper;
    };

    it('Component should render', async () => {
      const wrapper = await GetDefaultCognitoLogin();
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('`state.userInput` should be defined', async () => {
      const wrapper = await GetDefaultCognitoLogin();
      expect(wrapper.root.instance.state.userInput).toBeDefined();
    });

    it('`state.userInput.email` should be `undefined`', async () => {
      const wrapper = await GetDefaultCognitoLogin();
      expect(wrapper.root.instance.state.userInput.email).toBeUndefined();
    });

    it('`state.userInput.password` should be `undefined`', async () => {
      const wrapper = await GetDefaultCognitoLogin();
      expect(wrapper.root.instance.state.userInput.password).toBeUndefined();
    });

    it('`state.userInput.formState` should be `Login`', async () => {
      const wrapper = await GetDefaultCognitoLogin();
      expect(wrapper.root.instance.state.formState).toBe('Login');
    });

    it('`loginButtonProps` should set button title', async () => {
      const wrapper = await GetDefaultCognitoLogin({
        loginButtonProps: { title: 'MyTitle' },
      });
      const child = wrapper.root.findByProps({ iconName: 'sign-in' });
      expect(child.props.title).toBe('MyTitle');
    });

    describe('Component state updates', () => {
      beforeAll(() => {
        jest.setTimeout(10000);
      });

      it('`onEmailChanged` should update state', async () => {
        const wrapper = await GetDefaultCognitoLogin();

        const expectedEmail = 'bogus@stuff.com';
        wrapper.root.instance.onEmailChanged(expectedEmail);

        expect(wrapper.root.instance.state.userInput.email).toBe(expectedEmail);
      });

      it('`onPasswordChanged` should update state', async () => {
        const wrapper = await GetDefaultCognitoLogin();

        const expectedPassword = 'sup3rSecre7';
        wrapper.root.instance.onPasswordChanged(expectedPassword);

        expect(wrapper.root.instance.state.userInput.password).toBe(
          expectedPassword
        );
      });

      it('`onPhoneChanged` should update state', async () => {
        const wrapper = await GetDefaultCognitoLogin();

        const expectedInput = '+07304655556';
        wrapper.root.instance.onPhoneChanged(expectedInput);

        expect(wrapper.root.instance.state.userInput.phone).toBe(expectedInput);
      });

      it('`onLogin` should set `state.result` to defined value', async () => {
        const wrapper = await GetDefaultCognitoLogin();
        const child = wrapper.root.findByProps({ iconName: 'sign-in' });
        await child.props.onPress();
        const result = _.get(wrapper, ['root', 'instance', 'state', 'result']);

        expect(result).not.toBeUndefined();
      });

      it('`Register` button should set `state.formState` to `Register`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
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

      it('`Forgot password` button should set `formState` to `Forgot`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
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
        const wrapper = await GetDefaultCognitoLogin();
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
        const wrapper = await GetDefaultCognitoLogin();
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
      const wrapper = await GetDefaultCognitoLogin();
      const child = wrapper.root.findByProps({ iconName: 'sign-in' });
      await child.props.onPress();

      const errorLabel = wrapper.root.findByProps({ isCaption: true });
      expect(errorLabel.props.children).toBe('No userPool');
    });

    describe('formState Register', () => {
      it('onRegister should return user', async () => {
        let result: any = undefined;
        const setUser = (newUser: any) => (result = newUser);

        const mockUser = new CognitoUser({
          Username: 'bogus@test.com',
          Pool: new CognitoUserPool({
            UserPoolId: 'us-west-1_4g646Ssds',
            ClientId: '3tsldf7voa1hol83o6tk3j2349',
          }),
        });

        const spy = jest.spyOn(Auth, 'signUp').mockImplementation(() => ({
          code: 'UserNotConfirmedException',
          user: mockUser,
        }));

        const { CognitoLogin } = await import('./CognitoLogin');

        const wrapper = TestRenderer.create(
          <CognitoLogin onRegisteredUser={setUser} />
        );
        const state: ICognitoLoginState = {
          formState: 'Register',
          code: 'testcode',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
          result: undefined,
        };
        wrapper.root.instance.setState(state);
        await wrapper.root.instance.onRegister();

        expect(result).toBeDefined();
        spy.mockRestore();
      });

      it('Cancel button should set `formState` to `Login`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
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
      it('`onCodeChanged` should set `state.code`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
        wrapper.root.instance.setState({ formState: 'ConfirmAccount' });
        const child = wrapper.root.findByProps({
          testID: 'ConfirmAccountForm',
        });
        child.props.onCodeChanged('testcode');
        const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

        expect(result).toBe('testcode');
      });

      it('`OnResendSignup` should pass', async () => {
        const wrapper = await GetDefaultCognitoLogin();
        const state: ICognitoLoginState = {
          formState: 'ConfirmAccount',
          result: undefined,
          code: undefined,
          userInput: { email: 'bogus@test.com', password: 'testPw' },
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({ title: 'Resend code' });
        expect(child.props.onPress).not.toThrow();
      });

      it('On confirm account should set `formState` to `Login`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
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
        const wrapper = await GetDefaultCognitoLogin();
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
      it('`onCodeChanged` should set `state.code`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
        wrapper.root.instance.setState({ formState: 'ConfirmMFALogin' });
        const child = wrapper.root.findByProps({
          testID: 'ConfirmMFAForm',
        });
        child.props.onCodeChanged('testcode');
        const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

        expect(result).toBe('testcode');
      });

      it('`onConfirmPress` should return `Not a valid Code`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
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
        const wrapper = await GetDefaultCognitoLogin();
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
      it('`onCodeChanged` should set `state.code`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
        wrapper.root.instance.setState({ formState: 'NewPassword' });
        const child = wrapper.root.findByProps({
          testID: 'PasswordForm',
        });
        child.props.onCodeChanged('testcode');
        const result = _.get(wrapper, ['root', 'instance', 'state', 'code']);

        expect(result).toBe('testcode');
      });

      it('On save password should set formState to `Login`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
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
        const wrapper = await GetDefaultCognitoLogin();
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
      beforeAll(() => {
        jest.setTimeout(10000);
      });

      it('When no `code` or `email` `onSavePress` should set `message` to `Need code and user e-mail`', async () => {
        const wrapper = await GetDefaultCognitoLogin();
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
        const wrapper = await GetDefaultCognitoLogin();
        const state: ICognitoLoginState = {
          formState: 'Forgot',
          result: undefined,
          code: '12345',
          userInput: { email: 'bogus@test.com', password: 'testPw' },
        };
        wrapper.root.instance.setState(state);
        const child = wrapper.root.findByProps({ testID: 'ForgotForm' });
        expect(await child.props.onSubmit).not.toThrow();
      });

      it('ForgotPassword should set formState to `NewPassword`', async () => {
        // Have to mock the alert dialog that occurs
        jest.mock('react-native', {
          Alert: jest.fn,
        });
        const wrapper = await GetDefaultCognitoLogin();
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
