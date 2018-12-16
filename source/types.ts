/**
 * Describes the current state of user authentication process with AWS Cognito
 */
export type CognitoAuthState =
  | 'Unauthenticated'
  | 'ConfirmAccountCodeWaiting'
  | 'ConfirmAccountCodeAccepted'
  | 'ConfirmAccountCodeNotAccepted'
  | 'Authenticated';

/**
 * Describes user input for AWS Cognito authentication
 */
export interface ICognitoUserVariables {
  password: string | undefined;
  email: string | undefined;
  phone?: string | undefined;
}
