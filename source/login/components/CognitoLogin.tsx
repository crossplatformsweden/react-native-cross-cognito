import React from 'react';
import { View } from 'react-native';
import LoginForm from './LoginForm';
import {
  styles,
  Colors,
  CrossButton,
  ICrossButtonProps,
} from 'react-native-cross-components';
import { ICognitoUserVariables, CognitoAuthState } from '../../types';
import { CognitoUserInputContext } from '../../contexts';
import { OnLogin } from '../../events/OnLogin';
import _ from 'lodash';

export interface ICognitoLoginProps {
  /**
   * Optional props for the login button. Typically used to change the `title` prop.
   * See {@link ICrossButtonProps}
   */
  loginButtonProps?: ICrossButtonProps | undefined;
}

interface ICognitoLoginState {
  /**
   * See {@link ICognitoUserVariables}
   */
  userInput: ICognitoUserVariables;
  /**
   * See {@link CognitoAuthState}
   */
  authState: CognitoAuthState;
}

/**
 * A form for logging in to AWS Cognito through Amplify.
 *
 * Remarks:
 * * Requires Amplify to be configured
 * * State is managed using React.Context. See {@link CognitoUserInputContext}
 *
 * https://aws-amplify.github.io/docs/js/react
 *
 * @example
 *  <CognitoLogin>
 *      // Custom layouts here
 *  </CognitoLogin>
 */
export class CognitoLogin extends React.Component<
  ICognitoLoginProps,
  ICognitoLoginState
> {
  constructor(props: ICognitoLoginProps) {
    super(props);
    this.state = {
      userInput: {
        email: undefined,
        password: undefined,
      },
      authState: 'Unauthenticated',
    };

    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onLogin = this.onLogin.bind(this);
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

  async onLogin() {
    const result = await OnLogin(this.state.userInput);
    if (__DEV__) console.log('**** onLogin result: ', result);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}

        <LoginForm
          initialEmail={this.state.userInput.email}
          initialPassword={this.state.userInput.password}
          onEmailChanged={this.onEmailChanged}
          onPasswordChanged={this.onPasswordChanged}
        />

        <CognitoUserInputContext.Provider value={this.state.userInput} />

        <View style={styles.container}>
          <CrossButton
            onPress={this.onLogin}
            mode="contained"
            title="Log in"
            backgroundColor={Colors.NextButton}
            iconName="sign-in"
          />
        </View>
      </View>
    );
  }
}

export default CognitoLogin;
