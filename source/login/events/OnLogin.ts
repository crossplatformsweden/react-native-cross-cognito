import { ICognitoUserVariables } from '../../types';
import { Auth } from 'aws-amplify';
import { UsernamePasswordOpts } from '@aws-amplify/auth/lib/types/Auth';
import {
  CognitoUser,
  IAuthenticationCallback,
} from 'amazon-cognito-identity-js';

/**
 * Handles user login event
 * @param input See {@link ICognitoUserVariables}
 */
export const OnLogin = async (
  input: ICognitoUserVariables
): Promise<CognitoUser | IAuthenticationCallback | Error | string> => {
  const opts: UsernamePasswordOpts = {
    username: input.email as string,
    password: input.password as string,
  };
  try {
    const result:
      | CognitoUser
      | IAuthenticationCallback
      | string
      | Error = await Auth.signIn(opts);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default OnLogin;
