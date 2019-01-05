import { CognitoUser } from 'amazon-cognito-identity-js';
import { ICrossEditorProps } from 'react-native-cross-components';
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

export interface IEmailProps {
  /**
   * Occurs when the user inputs e-mail
   */
  onEmailChanged: (email: string | undefined) => void;
  /**
   * Optional initial value for the e-mail form
   */
  initialEmail?: string | undefined;
  /**
   * Optional props for the e-mail input. Typically used to change the `label` prop.
   * See {@link ICrossEditorProps}
   */
  emailInputProps?: ICrossEditorProps | undefined;
}
