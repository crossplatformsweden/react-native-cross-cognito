import React from 'react';
import { View, Alert, AlertButton } from 'react-native';
import LoginForm from '../../login/components/LoginForm';
import { Colors, CrossButton, CrossLabel } from 'react-native-cross-components';
import { CognitoAuthState, IAuthenticationResult } from '../../types';
import { CognitoUserInputContext } from '../../contexts';
import { OnLogin } from '../../events/OnLogin';
import _ from 'lodash';
import RegisterForm from '../../register/components/RegisterForm';
import { ForgotForm } from '../../forgot/components/ForgotForm';
import { ConfirmForm } from '../../confirm/components/ConfirmForm';
import { OnRegister } from '../../events/OnRegister';
import styles from '../../styles';
import OnConfirmMfaCode from '../../events/OnConfirmMfaCode';
import OnConfirmAccount from '../../events/OnConfirmAccount';
import OnResendSignup from '../../events/OnResendSignup';
import { ICognitoLoginProps } from './ICognitoLoginProps';
import { ICognitoLoginState } from './ICognitoLoginState';
import { LoginCurrentForm } from '../types';

/**
 * A form for logging in to AWS Cognito through Amplify.
 *
 * On successful login the {@link ICognitoLoginProps.onLoggedIn} event is triggered.
 *
 * Remarks:
 * * Requires Amplify to be configured:
 *
 * https://aws-amplify.github.io/docs/js/start?ref=amplify-rn-btn&platform=react-native#step-4-integrate-aws-resources
 *
 * Props are {@link ICognitoLoginProps}
 *
 * @example
 *  <CognitoLogin
 *    onLoggedIn={(user) => console.log(user)}
 *    buttonProps={{mode: 'contained'}}>
 *     <Text>Custom layouts here</Text>
 *  </CognitoLogin>
 */
export class CognitoLogin extends React.Component<
  ICognitoLoginProps,
  ICognitoLoginState
> {
  constructor(props: ICognitoLoginProps) {
    super(props);
    this.state = {
      result: undefined,
      userInput: __DEV__
        ? {
            email: 'cogtest@mailinator.com',
            password: 'Password1#',
            phone: '+46730555252',
          }
        : { email: undefined, password: undefined },
      formState: 'Login',
      code: undefined,
      message: undefined,
    };
  }

  onResultChanged = () => {
    let form: LoginCurrentForm = 'Login';
    const result = this.state.result as IAuthenticationResult;
    const authState: CognitoAuthState = _.get(this.state, ['result', 'state']);

    if (!authState) {
      return;
    }

    switch (authState) {
      case 'Authenticated':
        form = 'Login';
        if (result && result.user && this.props.onLoggedIn) {
          this.props.onLoggedIn(result.user);
        }
        break;
      case 'ConfirmAccountCodeWaiting':
        form = 'ConfirmAccount';
        break;
      case 'ConfirmLoginMFAWaiting':
        form = 'ConfirmMFALogin';
        break;
      default:
        break;
    }

    let { message } = this.state;
    if (authState === 'Authenticated') {
      message = 'Logged in!';
    }

    this.setState({ formState: form, message });
  }

  onEmailChanged = (email: string | undefined) => {
    const { userInput } = this.state;
    if (_.isNil(email)) {
      return;
    }
    userInput.email = email;
    this.setState({ userInput });
  }

  onPasswordChanged = (password: string | undefined) => {
    const { userInput } = this.state;
    if (_.isNil(password)) {
      return;
    }

    userInput.password = password;
    this.setState({ userInput });
  }

  onPhoneChanged = (phone: string | undefined) => {
    const { userInput } = this.state;
    let newPhone = phone;
    if (_.isNil(newPhone)) {
      return;
    }

    newPhone = newPhone.replace(' ', '').trim();

    if (!newPhone.startsWith('+')) {
      newPhone = '+' + newPhone;
    }

    userInput.phone = newPhone;
    this.setState({ userInput });
  }

  OnResendSignup = () => {
    const { email } = this.state.userInput;
    if (_.isNil(email)) {
      this.setState({ message: 'Please enter username' });
      return;
    }

    const sendButton: AlertButton = {
      text: 'OK',
      onPress: () => OnResendSignup(email),
    };

    Alert.alert('Confirm', 'Re-send code?', [sendButton], { cancelable: true });
  }

  onRegister = async () => {
    if (__DEV__) console.log('***** onRegister ***** ');
    const result = await OnRegister(this.state.userInput);
    if (__DEV__) console.log('**** onRegister result: ', result);

    this.setState({ result }, this.onResultChanged);
  }

  onConfirmAccount = async () => {
    if (
      _.isNil(this.state.code) ||
      this.state.code === '' ||
      _.isNil(this.state.userInput.email)
    ) {
      this.setState({ message: 'Need code and user e-mail' });
      return;
    }

    if (__DEV__) console.log('***** onConfirmAccount ***** ');

    const result = await OnConfirmAccount(
      this.state.code,
      this.state.userInput.email
    );

    if (__DEV__) console.log('**** onConfirmAccount result: ', result);

    this.setState({ result, formState: 'Login' }, this.onResultChanged);
  }

  onConfirmMFACode = async () => {
    if (
      _.isNil(this.state.code) ||
      this.state.code === '' ||
      _.isNil(this.state.userInput.email)
    ) {
      return;
    }

    if (__DEV__) console.log('***** onConfirmMFACode ***** ');

    const result = await OnConfirmMfaCode(
      this.state.code,
      this.state.userInput.email
    );

    if (__DEV__) console.log('**** onConfirmMFACode result: ', result);

    this.setState({ result }, this.onResultChanged);
  }

  onLogin = async () => {
    if (__DEV__) console.log('***** onLogin ***** ');
    const result = await OnLogin(this.state.userInput);
    if (__DEV__) console.log('**** onLogin result: ', result);

    this.setState({ result }, this.onResultChanged);
  }

  render = () => {
    // Extract error message. Could be an Error or a string
    const error =
      _.get(this.state, ['result', 'error', 'message']) ||
      _.get(this.state, ['result', 'error'] || this.state.message);

    return (
      <View style={styles.container}>
        {this.props.children}
        {this.state.formState === 'Login' ? (
          <View style={styles.container}>
            <LoginForm
              initialEmail={this.state.userInput.email}
              initialPassword={this.state.userInput.password}
              onEmailChanged={this.onEmailChanged}
              onPasswordChanged={this.onPasswordChanged}
              {...this.props}
            />
            <CrossButton
              style={styles.marginTop10}
              buttonStyle={styles.buttonStyle}
              onPress={async () => await this.onLogin()}
              mode='contained'
              title='Log in'
              backgroundColor={Colors.NextButton}
              iconName='sign-in'
              {...this.props.buttonProps}
              {...this.props.loginButtonProps}
            />
            <CrossButton
              style={styles.marginTop10}
              buttonStyle={styles.buttonStyle}
              onPress={() =>
                this.setState({
                  formState: 'Register',
                })
              }
              mode='contained'
              title='Register'
              backgroundColor={Colors.BackButton}
              {...this.props.buttonProps}
              {...this.props.registerButtonProps}
            />
          </View>
        ) : null}

        {this.state.formState === 'Register' ? (
          <View style={styles.container}>
            <RegisterForm
              initialPhone={this.state.userInput.phone}
              onPhoneChanged={this.onPhoneChanged}
              initialEmail={this.state.userInput.email}
              initialPassword={this.state.userInput.password}
              onEmailChanged={this.onEmailChanged}
              onPasswordChanged={this.onPasswordChanged}
              {...this.props}
            />
            <CrossButton
              style={styles.marginTop10}
              buttonStyle={styles.buttonStyle}
              onPress={async () => await this.onRegister()}
              mode='contained'
              title='Save'
              backgroundColor={Colors.NextButton}
              iconName='sign-in'
              {...this.props.buttonProps}
              {...this.props.saveButtonProps}
            />
            <CrossButton
              style={styles.marginTop10}
              buttonStyle={styles.buttonStyle}
              onPress={() =>
                this.setState({
                  formState: 'Login',
                })
              }
              mode='contained'
              title='Cancel'
              backgroundColor={Colors.CancelButton}
              {...this.props.buttonProps}
              {...this.props.cancelButtonProps}
            />
          </View>
        ) : null}
        {this.state.formState === 'Forgot' ? (
          <ForgotForm {...this.props} />
        ) : null}
        {this.state.formState === 'ConfirmAccount' ? (
          <View style={styles.container}>
            <ConfirmForm
              testID='ConfirmAccountForm'
              code={this.state.code}
              initialEmail={this.state.userInput.email}
              onEmailChanged={this.onEmailChanged}
              onConfirmPress={async () => await this.onConfirmAccount()}
              onCodeChanged={(code) => this.setState({ code })}
              {...this.props}
              confirmButtonProps={{
                ...this.props.buttonProps,
                ...this.props.saveButtonProps,
              }}
            />
            <CrossButton
              style={styles.marginTop10}
              buttonStyle={styles.buttonStyle}
              onPress={() => this.OnResendSignup()}
              mode='contained'
              title='Resend code'
              backgroundColor={Colors.CancelButton}
              {...this.props.buttonProps}
              {...this.props.cancelButtonProps}
            />
          </View>
        ) : null}
        {this.state.formState === 'ConfirmMFALogin' ? (
          <ConfirmForm
            testID='ConfirmMFAForm'
            code={this.state.code}
            initialEmail={this.state.userInput.email}
            onEmailChanged={this.onEmailChanged}
            onConfirmPress={async () => await this.onConfirmMFACode()}
            onCodeChanged={(code) => this.setState({ code })}
            {...this.props}
            confirmButtonProps={{
              ...this.props.buttonProps,
              ...this.props.saveButtonProps,
            }}
          />
        ) : null}
        <CognitoUserInputContext.Provider value={this.state.userInput} />

        <CrossLabel isCaption={true} style={{ color: 'red' }}>
          {(error || '').toString()}
        </CrossLabel>
      </View>
    );
  }
}

export default CognitoLogin;
