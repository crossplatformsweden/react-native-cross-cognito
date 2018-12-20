import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import {
  styles,
  Colors,
  CrossButton,
  ICrossButtonProps,
} from 'react-native-cross-components';
import {
  ICognitoUserVariables,
  CognitoAuthState,
  IAuthenticationResult,
} from '../../types';
import { CognitoUserInputContext } from '../../contexts';
import { OnLogin } from '../../events/OnLogin';
import _ from 'lodash';
import { CrossLabel } from 'react-native-cross-components';
import RegisterForm from '../../register/components/RegisterForm';
import { ForgotForm } from '../../forgot/components/ForgotForm';
import { ConfirmForm } from '../../confirm/components/ConfirmForm';

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
}
/**
 * Current active form
 */
type LoginCurrentForm = 'Login' | 'Register' | 'Confirm' | 'Forgot';

interface ICognitoLoginState {
  /**
   * User form input. See {@link ICognitoUserVariables}
   */
  userInput: ICognitoUserVariables;
  /**
   * Current auth state. See {@link CognitoAuthState}
   */
  authState: CognitoAuthState;
  /**
   * See {@link AuthFormState}
   */
  formState: LoginCurrentForm;
  /**
   * Result of the last authentication operation
   */
  result: IAuthenticationResult | undefined;
}

const localStyles = StyleSheet.create({
  marginTop10: { marginTop: 10 },
  buttonStyle: { margin: 0, minHeight: 45 },
});

/**
 * A form for logging in to AWS Cognito through Amplify.
 *
 * Remarks:
 * * Requires Amplify to be configured: https://aws-amplify.github.io/docs/js/react
 * * State is managed using React.Context. See {@link CognitoUserInputContext}
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
      userInput: {
        email: undefined,
        password: undefined,
      },
      authState: 'Unauthenticated',
      formState: 'Login',
    };

    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onPhoneChanged = this.onPhoneChanged.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.setActiveForm = this.setActiveForm.bind(this);
  }

  setActiveForm() {
    let form: LoginCurrentForm = 'Login';
    switch (this.state.authState) {
      case 'ConfirmAccountCodeWaiting':
        form = 'Confirm';
        break;
      default:
        break;
    }

    this.setState({ formState: form });
  }

  onEmailChanged(email: string | undefined) {
    const { userInput } = this.state;
    userInput.email = email;
    this.setState({ userInput });
  }

  onPasswordChanged(password: string | undefined) {
    const { userInput } = this.state;
    userInput.password = password;
    this.setState({ userInput });
  }

  onPhoneChanged(phone: string | undefined) {
    const { userInput } = this.state;
    userInput.phone = phone;
    this.setState({ userInput });
  }

  async onLogin() {
    if (__DEV__) console.log('***** onLogin ***** ');
    const result = await OnLogin(this.state.userInput);
    if (__DEV__) console.log('**** onLogin result: ', result);

    this.setState(
      {
        authState: result && result.state ? result.state : 'Unauthenticated',
        result,
      },
      this.setActiveForm
    );
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
            />
            <CrossButton
              style={localStyles.marginTop10}
              buttonStyle={localStyles.buttonStyle}
              onPress={async () => await this.onLogin()}
              mode='contained'
              title='Log in'
              backgroundColor={Colors.NextButton}
              iconName='sign-in'
              {...this.props.loginButtonProps}
            />
            <CrossButton
              style={localStyles.marginTop10}
              buttonStyle={localStyles.buttonStyle}
              onPress={() =>
                this.setState({
                  formState: 'Register',
                })
              }
              mode='contained'
              title='Register'
              backgroundColor={Colors.BackButton}
            />
          </View>
        ) : null}

        {this.state.formState === 'Register' ? (
          <RegisterForm
            initialPhone={this.state.userInput.phone}
            onPhoneChanged={this.onPhoneChanged}
            initialEmail={this.state.userInput.email}
            initialPassword={this.state.userInput.password}
            onEmailChanged={this.onEmailChanged}
            onPasswordChanged={this.onPasswordChanged}
          />
        ) : null}
        {this.state.formState === 'Forgot' ? <ForgotForm /> : null}
        {this.state.formState === 'Confirm' ? <ConfirmForm /> : null}
        <CognitoUserInputContext.Provider value={this.state.userInput} />

        <CrossLabel isCaption={true} style={{ color: 'red' }}>
          {error}
        </CrossLabel>
      </View>
    );
  }
}

export default CognitoLogin;
