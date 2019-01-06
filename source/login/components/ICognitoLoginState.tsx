import { ICognitoUserVariables, IAuthenticationResult } from '../../types';
import { LoginCurrentForm } from './LoginCurrentForm';
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
  message?: string | undefined;
}