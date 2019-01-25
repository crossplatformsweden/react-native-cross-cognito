import { CognitoUser } from 'amazon-cognito-identity-js';
import { ICrossEditorProps } from 'react-native-cross-components';

export type ITestIDProps = {
  testID?: string | undefined;
};

/**
 * Describes the current state of user authentication process with AWS Cognito
 */
export type CognitoAuthState =
  | 'Unauthenticated'
  | 'ConfirmAccountCodeWaiting'
  | 'ConfirmAccountCodeAccepted'
  | 'ConfirmAccountCodeNotAccepted'
  | 'ConfirmLoginMFAWaiting'
  | 'Authenticated'
  | 'AuthenticationError'
  | 'MFA_SETUP'
  | 'NEW_PASSWORD_REQUIRED';

/**
 * Describes the result of an authentication attempt with Amazon Cognito
 */
export interface IAuthenticationResult {
  /**
   * See {@link CognitoAuthState}
   */
  state: CognitoAuthState;
  /**
   * If `state` was `AuthenticationError` this contains the error
   */
  error?: Error | undefined;
  /**
   * If `state` was `Authenticated` this contains the user
   */
  user?: CognitoUser | undefined;
}

/**
 * Describes user input for AWS Cognito authentication
 */
export interface ICognitoUserVariables {
  password: string | undefined;
  email: string | undefined;
  phone?: string | undefined;
}

/**
 * Describes commmon props for components with phone input
 */
export interface IPhoneProps {
  /**
   * Occurs when the user inputs phone
   */
  onPhoneChanged: (password: string | undefined) => void;
  /**
   * Optional initial value for the phone input
   */
  initialPhone?: string | undefined;
  /**
   * Optional props for the phone input. Typically used to change the `label` prop or change the `maskProps`.
   * See {@link ICrossEditorProps}
   */
  phoneInputProps?: ICrossEditorProps | undefined;
}

/**
 * Describes commmon props for components with e-mail input
 */
export interface IEmailProps {
  /**
   * Occurs when the user inputs e-mail
   */
  onEmailChanged: (email: string | undefined) => void;
  /**
   * Optional initial value for the e-mail input
   */
  initialEmail?: string | undefined;
  /**
   * Optional props for the e-mail input. Typically used to change the `label` prop.
   * See {@link ICrossEditorProps}
   */
  emailInputProps?: ICrossEditorProps | undefined;
}

/**
 * Describes commmon props for components with password input
 */
export interface IPasswordProps {
  /**
   * Occurs when the user inputs password
   */
  onPasswordChanged: (password: string | undefined) => void;
  /**
   * Optional initial value for the password input
   */
  initialPassword?: string | undefined;
  /**
   * Optional props for the password input. Typically used to change the `label` prop.
   * See {@link ICrossEditorProps}
   */
  passwordInputProps?: ICrossEditorProps | undefined;
}

export interface ICodeProps {
  /**
   * Optional callback for code changed. Contains code user entered
   */
  onCodeChanged?: (code: string | undefined) => void;
  /**
   * Current user input or undefined. Required.
   */
  code: string | undefined;
  /**
   * Optional props for the code input. Typically used to change the `label` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_input_crosseditor_.icrosseditorprops.html
   *
   * @example
   *  <ConfirmForm codeInputProps={{label: 'WouldntYouLikeToKnow'}}>
   *     <Text>Custom layouts here</Text>
   *  </ConfirmForm>
   */
  codeInputProps?: ICrossEditorProps | undefined;
}
