import { ICognitoUserVariables, IAuthenticationResult } from '../../types';
import { Auth } from 'aws-amplify';
import { UsernamePasswordOpts } from '@aws-amplify/auth/lib/types/Auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
import _ from 'lodash';

/**
 * Handles user login event
 * @param input See {@link ICognitoUserVariables}
 */
export const OnLogin = async (
  input: ICognitoUserVariables
): Promise<IAuthenticationResult> => {
  const opts: UsernamePasswordOpts = {
    username: input.email as string,
    password: input.password as string,
  };
  try {
    const result = await Auth.signIn(opts);

    if (_.get(result, 'getUsername')) {
      return { state: 'Authenticated', user: result as CognitoUser };
    }

    if (_.get(result, 'code') === 'UserNotConfirmedException') {
      return { state: 'ConfirmAccountCodeWaiting' };
    }

    return { state: 'Unauthenticated' };
  } catch (error) {
    console.log(error);
    return { state: 'AuthenticationError', error };
  }
};

export default OnLogin;
