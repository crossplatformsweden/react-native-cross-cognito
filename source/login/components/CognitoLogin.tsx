import React from 'react';
import { View } from 'react-native';
import LoginForm from './LoginForm';
import {
  Colors,
  CrossButton,
  ICrossButtonProps,
  CrossLabel,
} from 'react-native-cross-components';
import {
  ICognitoUserVariables,
  CognitoAuthState,
  IAuthenticationResult,
} from '../../types';
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
import { ICrossEditorProps } from 'react-native-cross-components';

/**
 * Properties for the {@link CognitoLogin} component
 */
export interface ICognitoLoginProps {
  /**
   * Optional props for the login button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin loginButtonProps={{title: 'Engage'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  loginButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the cancel button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin cancelButtonProps={{title: 'Disengage'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  cancelButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the save button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin saveButtonProps={{title: 'Warp'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  saveButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the register button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin registerButtonProps={{title: 'Enlist'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  registerButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the phone input. Typically used to change the `label` prop or change the `maskProps`.
   * See {@link ICrossEditorProps}
   */
  phoneInputProps?: ICrossEditorProps | undefined;
  /**
   * Optional props for the e-mail input. Typically used to change the `label` prop.
   * See {@link ICrossEditorProps}
   */
  emailInputProps?: ICrossEditorProps | undefined;
  /**
   * Optional props for the password input. Typically used to change the `label` prop.
   * See {@link ICrossEditorProps}
   */
  passwordInputProps?: ICrossEditorProps | undefined;
}
/**
 * Current active form
 */
type LoginCurrentForm =
  | 'Login'
  | 'Register'
  | 'ConfirmAccount'
  | 'ConfirmMFALogin'
  | 'Forgot';

export interface ICognitoLoginState {
  /**
   * User form input. See {@link ICognitoUserVariables}
   */
  userInput: ICognitoUserVariables;
  /**
   * See {@link AuthFormState}
   */
  formState: LoginCurrentForm;
  /**
   * Result of the last authentication operation
   */
  result: IAuthenticationResult | undefined;
  code: string | undefined;
}

/**
 * A form for logging in to AWS Cognito through Amplify.
 *
 * Remarks:
 * * Requires Amplify to be configured:
 *
 * https://aws-amplify.github.io/docs/js/start?ref=amplify-rn-btn&platform=react-native#step-4-integrate-aws-resources
 *
 * Props are {@link ICognitoLoginProps}
 *
 * @example
 *  <CognitoLogin loginButtonProps={{title: 'Engage'}}>
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
      userInput: { email: undefined, password: undefined },
      formState: 'Login',
      code: undefined,
    };

    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onPhoneChanged = this.onPhoneChanged.bind(this);
    this.onConfirmMFACode = this.onConfirmMFACode.bind(this);
    this.onConfirmAccount = this.onConfirmAccount.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.setActiveForm = this.setActiveForm.bind(this);
  }

  setActiveForm() {
    let form: LoginCurrentForm = 'Login';
    const authState: CognitoAuthState = _.get(this.state, [
      'result',
      'authState',
    ]);

    if (!authState) {
      return;
    }

    switch (authState) {
      case 'ConfirmAccountCodeWaiting':
        form = 'ConfirmAccount';
        break;
      case 'ConfirmLoginMFAWaiting':
        form = 'ConfirmMFALogin';
      default:
        break;
    }

    this.setState({ formState: form });
  }

  onEmailChanged(email: string | undefined) {
    const { userInput } = this.state;
    if (_.isNil(email)) {
      return;
    }
    userInput.email = email;
    this.setState({ userInput });
  }

  onPasswordChanged(password: string | undefined) {
    const { userInput } = this.state;
    if (_.isNil(password)) {
      return;
    }

    userInput.password = password;
    this.setState({ userInput });
  }

  onPhoneChanged(phone: string | undefined) {
    const { userInput } = this.state;
    let newPhone = phone;
    if (_.isNil(newPhone)) {
      return;
    }

    if (!newPhone.startsWith('+')) {
      newPhone = '+' + newPhone;
    }

    userInput.phone = newPhone;
    this.setState({ userInput });
  }

  async onRegister() {
    if (__DEV__) console.log('***** onRegister ***** ');
    const result = await OnRegister(this.state.userInput);
    if (__DEV__) console.log('**** onRegister result: ', result);

    this.setState({ result }, this.setActiveForm);
  }

  async onConfirmAccount() {
    if (
      _.isNil(this.state.code) ||
      this.state.code === '' ||
      _.isNil(this.state.userInput.email)
    ) {
      return;
    }

    if (__DEV__) console.log('***** onConfirmAccount ***** ');

    const result = await OnConfirmAccount(
      this.state.code,
      this.state.userInput.email
    );

    if (__DEV__) console.log('**** onConfirmAccount result: ', result);

    this.setState({ result }, this.setActiveForm);
  }

  async onConfirmMFACode() {
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

    this.setState({ result }, this.setActiveForm);
  }

  async onLogin() {
    if (__DEV__) console.log('***** onLogin ***** ');
    const result = await OnLogin(this.state.userInput);
    if (__DEV__) console.log('**** onLogin result: ', result);

    this.setState({ result }, this.setActiveForm);
  }

  render() {
    // Extract error message. Could be an Error or a string
    const error =
      _.get(this.state, ['result', 'error', 'message']) ||
      _.get(this.state, ['result', 'error']);

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
              {...this.props.cancelButtonProps}
            />
          </View>
        ) : null}
        {this.state.formState === 'Forgot' ? (
          <ForgotForm {...this.props} />
        ) : null}
        {this.state.formState === 'ConfirmAccount' ? (
          <ConfirmForm
            testID='ConfirmAccountForm'
            code={this.state.code}
            onConfirmPress={async () => await this.onConfirmAccount()}
            onCodeChanged={(code) => this.setState({ code })}
            {...this.props}
          />
        ) : null}
        {this.state.formState === 'ConfirmMFALogin' ? (
          <ConfirmForm
            code={this.state.code}
            onConfirmPress={async () => await this.onConfirmMFACode()}
            onCodeChanged={(code) => this.setState({ code })}
          />
        ) : null}
        <CognitoUserInputContext.Provider value={this.state.userInput} />

        <CrossLabel isCaption={true} style={{ color: 'red' }}>
          {error}
        </CrossLabel>
      </View>
    );
  }
}

export default CognitoLogin;
