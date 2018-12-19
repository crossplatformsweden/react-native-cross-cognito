import { ICognitoUserVariables, IAuthenticationResult } from '../types';
import { Auth } from 'aws-amplify';
import { UsernamePasswordOpts } from '@aws-amplify/auth/lib/types/Auth';
import _ from 'lodash';
import OnCheckSession from './OnCheckSession';

/**
 * Handles user login event
 * @param input See {@link ICognitoUserVariables}
 * @returns See {@link IAuthenticationResult}
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
    return OnCheckSession(result);
  } catch (error) {
    if (__DEV__) console.log(error);
    return { state: 'AuthenticationError', error };
  }
};

export default OnLogin;
