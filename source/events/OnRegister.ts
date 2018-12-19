import { ICognitoUserVariables, IAuthenticationResult } from '../types';
import { SignUpParams } from '@aws-amplify/auth/lib/types/Auth';
import OnCheckSession from './OnCheckSession';
import { Auth } from 'aws-amplify';

/**
 * Register the user with AWS Cognito through Amplify
 * @param input See {@link ICognitoUserVariables}
 * @returns See {@link IAuthenticationResult}
 */
export const OnRegister = async (
  input: ICognitoUserVariables
): Promise<IAuthenticationResult> => {
  const opts: SignUpParams = {
    username: input.email as string,
    password: input.password as string,
    attributes: {
      email: input.email,
      phone_number: input.phone,
    },
  };

  try {
    const result = await Auth.signUp(opts);
    return OnCheckSession(result);
  } catch (error) {
    if (__DEV__) console.log(error);
    return { state: 'AuthenticationError', error };
  }
};

export default OnRegister;
