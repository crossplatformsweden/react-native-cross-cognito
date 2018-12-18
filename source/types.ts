import { CognitoUser } from 'amazon-cognito-identity-js';
/**
 * Describes the current state of user authentication process with AWS Cognito
 */
export type CognitoAuthState =
  | 'Unauthenticated'
  | 'ConfirmAccountCodeWaiting'
  | 'ConfirmAccountCodeAccepted'
  | 'ConfirmAccountCodeNotAccepted'
  | 'Authenticated'
  | 'AuthenticationError';

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
