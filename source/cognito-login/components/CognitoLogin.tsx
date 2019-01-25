import React from 'react';
import { View, Alert, AlertButton, ScrollView } from 'react-native';
import LoginForm from '../../login/components/LoginForm';
import { Colors, CrossButton, CrossLabel } from 'react-native-cross-components';
import { CognitoAuthState, IAuthenticationResult } from '../../types';
import { OnLogin } from '../../events/OnLogin';
import _ from 'lodash';
import RegisterForm from '../../register/components/RegisterForm';
import { ForgotForm } from '../../forgot/components/ForgotForm';
import { ConfirmForm } from '../../confirm/components/ConfirmForm';
import { OnRegister } from '../../events/OnRegister';
import styles from '../../styles';
import OnConfirmMfaCode from '../../events/OnConfirmMfaCode';
import OnConfirmAccount from '../../events/OnConfirmAccount';
import { ICognitoLoginProps } from './ICognitoLoginProps';
import { ICognitoLoginState } from './ICognitoLoginState';
import { LoginCurrentForm } from '../types';
import { OnForgotPassword } from '../../events/OnForgotPassword';
import { OnResendSignup } from '../../events/OnResendSignup';
import { PasswordForm } from '../../new-password/components/PasswordForm';
import { OnConfirmPassword } from '../../events/OnConfirmPassword';

/**
 * A form for logging in to AWS Cognito through Amplify.
 *
 * On successful registration the {@link ICognitoLoginProps.onRegisteredUser} event is triggered.
 *
 * On successful login the {@link ICognitoLoginProps.onLoggedIn} event is triggered.
 *
 * Children can be supplied for the this component as well as child components. See {@link ICognitoLoginProps}.
 *
 * Remarks:
 * * Requires Amplify to be configured:
 *
 * https://aws-amplify.github.io/docs/js/start?ref=amplify-rn-btn&platform=react-native#step-4-integrate-aws-resources
 *
 * Props are {@link ICognitoLoginProps}
 *
 * @example <caption>With custom button props and callback</caption>
 *  <CognitoLogin
 *    onRegisteredUser={(user) => {
 *      Alert.alert('Registration complete', 'Thank you ' + user.getUsername());
 *    }}
 *    onLoggedIn={(user) => {
 *      Alert.alert('Logged in', 'Welcome ' + user.getUsername());
 *    }}
 *    buttonProps={{mode: 'contained'}}>
 *     <Text>Custom layouts here</Text>
 *  </CognitoLogin>
 * @example <caption>With custom children</caption>
 *  <CognitoLogin
 *      registerChildren={
 *        <Text
 *          style={{
 *            color: 'blue',
 *            fontWeight: 'bold',
 *            margin: 10,
 *            fontSize: 16,
 *          }}
 *        >
 *          &lt;ENLIST NOW&gt;
 *      </Text>
 *      }
 *    >
 *      <Text
 *        style={{
 *          color: 'red',
 *          fontWeight: 'bold',
 *          margin: 10,
 *          fontSize: 16,
 *        }}
 *      >
 *        &lt;WARNING: RESTRICTED AREA&gt; :)
 *      </Text>
 *    </CognitoLogin>
 */
export class CognitoLogin extends React.Component<
  ICognitoLoginProps,
  ICognitoLoginState
> {
  constructor(props: ICognitoLoginProps) {
    super(props);
    this.state = {
      result: undefined,
      userInput: { email: undefined, password: undefined },
      formState: 'Login',
      code: undefined,
      message: undefined,
    };
  }

  /**
   * Determines the currently visible form
   */
  onResultChanged = () => {
    let form: LoginCurrentForm = this.state.formState;
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
      case 'NEW_PASSWORD_REQUIRED':
        form = 'NewPassword';
        break;
      case 'Unauthenticated':
        form = 'Login';
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
      onPress: async () => {
        if (__DEV__) console.log('***** OnResendSignup ***** ');
        const result = await OnResendSignup(email);
        if (__DEV__) console.log('**** OnResendSignup result: ', result);

        this.setState({ result }, this.onResultChanged);
      },
    };

    Alert.alert(
      'Confirm',
      'Re-send code?',
      [sendButton, this.cancelAlertButton],
      {
        cancelable: true,
      }
    );
  }

  ForgotPasswordAsync = async (email: string) => {
    if (__DEV__) console.log('***** OnForgotPassword ***** ');
    const result = await OnForgotPassword(email);
    if (__DEV__) console.log('**** OnForgotPassword result: ', result);

    this.setState({ result }, this.onResultChanged);
  }

  OnResetPassword = () => {
    const { email } = this.state.userInput;
    if (_.isNil(email)) {
      this.setState({ message: 'Please enter username' });
      return;
    }

    Alert.alert(
      'Confirm',
      'Reset password?',
      [this.ForgotPasswordAlertButton, this.cancelAlertButton],
      {
        cancelable: true,
      }
    );
  }

  onRegister = async () => {
    if (__DEV__) console.log('***** OnRegister ***** ');
    const result = await OnRegister(this.state.userInput);
    if (__DEV__) console.log('**** OnRegister result: ', result);

    if (result.user && this.props.onRegisteredUser) {
      this.props.onRegisteredUser(result.user);
    }

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
      this.setState({
        message: 'Please enter username and the code',
      });
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

  onSaveNewPassword = async () => {
    if (
      _.isNil(this.state.code) ||
      this.state.code === '' ||
      _.isNil(this.state.userInput.email) ||
      _.isNil(this.state.userInput.password)
    ) {
      this.setState({
        message: 'Please enter username, code and new password',
      });
      return;
    }

    if (__DEV__) console.log('***** onSaveNewPassword ***** ');

    const result = await OnConfirmPassword(
      this.state.code,
      this.state.userInput.email,
      this.state.userInput.password
    );

    if (__DEV__) console.log('**** onSaveNewPassword result: ', result);

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
    console.log('*** CognitioLogin error: ', error || 'none');

    return (
      <View
        style={this.props.style ? this.props.style : styles.container}
        testID={this.props.testID}
      >
        <ScrollView style={this.props.scrolViewStyle}>
          {this.props.children}
          {this.state.formState === 'Login' ? (
            <View style={styles.container}>
              <LoginForm
                initialEmail={this.state.userInput.email}
                initialPassword={this.state.userInput.password}
                onEmailChanged={this.onEmailChanged}
                onPasswordChanged={this.onPasswordChanged}
                {...this.props}
              >
                {this.props.loginChildren}
              </LoginForm>
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
              <CrossButton
                style={styles.marginTop10}
                buttonStyle={styles.buttonStyle}
                onPress={() =>
                  this.setState({
                    formState: 'Forgot',
                  })
                }
                mode='text'
                title='Forgot password'
                backgroundColor={Colors.CancelButton}
                {...this.props.buttonProps}
                {...this.props.cancelButtonProps}
              />
            </View>
          ) : null}

          {this.state.formState === 'Register' ? (
            <View style={styles.container}>
              <RegisterForm
                initialPhone={this.state.userInput.phone}
                onPhoneChanged={this.onPhoneChanged}
                initialEmail={this.state.userInput.email}
                onEmailChanged={this.onEmailChanged}
                initialPassword={this.state.userInput.password}
                onPasswordChanged={this.onPasswordChanged}
                {...this.props}
              >
                {this.props.registerChildren}
              </RegisterForm>
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
          {this.state.formState === 'NewPassword' ? (
            <View style={styles.container}>
              <PasswordForm
                testID='PasswordForm'
                onSavePress={async () => await this.onSaveNewPassword()}
                initialPassword={this.state.userInput.password}
                onPasswordChanged={this.onPasswordChanged}
                initialEmail={this.state.userInput.email}
                onEmailChanged={this.onEmailChanged}
                code={this.state.code}
                onCodeChanged={(code) => this.setState({ code })}
              />
            </View>
          ) : null}
          {this.state.formState === 'Forgot' ? (
            <View style={styles.container}>
              <ForgotForm
                testID='ForgotForm'
                initialEmail={this.state.userInput.email}
                onEmailChanged={this.onEmailChanged}
                onSubmit={this.OnResetPassword}
                buttonProps={{
                  ...this.props.buttonProps,
                  ...this.props.saveButtonProps,
                }}
                {...this.props}
              >
                {this.props.forgotChildren}
              </ForgotForm>
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
                backgroundColor={Colors.BackButton}
                {...this.props.buttonProps}
                {...this.props.cancelButtonProps}
              />
            </View>
          ) : null}
          {this.state.formState === 'ConfirmAccount' ? (
            <View style={styles.container}>
              <ConfirmForm
                testID='ConfirmAccountForm'
                code={this.state.code}
                onCodeChanged={(code) => this.setState({ code })}
                initialEmail={this.state.userInput.email}
                onEmailChanged={this.onEmailChanged}
                onConfirmPress={async () => await this.onConfirmAccount()}
                {...this.props}
                confirmButtonProps={{
                  ...this.props.buttonProps,
                  ...this.props.saveButtonProps,
                }}
              >
                {this.props.confirmChildren}
              </ConfirmForm>
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
            >
              {this.props.confirmChildren}
            </ConfirmForm>
          ) : null}
        </ScrollView>
        <CrossLabel isCaption={true} style={{ color: 'red' }}>
          {(error || '').toString()}
        </CrossLabel>
      </View>
    );
  }

  ForgotPasswordAlertButton: AlertButton = {
    text: 'OK',
    onPress: async () =>
      await this.ForgotPasswordAsync(this.state.userInput.email || ''),
  };

  cancelAlertButton: AlertButton = {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  };
}

export default CognitoLogin;
