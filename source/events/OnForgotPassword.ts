import { IAuthenticationResult } from '../types';
import OnCheckSession from './OnCheckSession';
import { Auth } from 'aws-amplify';

/**
 * Start the change password flow with AWS Cognito, followed by the {@link OnConfirmPassword}
 * @param input See {@link ICognitoUserVariables}
 * @returns See {@link IAuthenticationResult}
 */
export const OnForgotPassword = async (
  username: string
): Promise<IAuthenticationResult> => {
  try {
    const result = await Auth.forgotPassword(username);
    return OnCheckSession(result);
  } catch (error) {
    // if (__DEV__) console.log(error);
    return OnCheckSession(error);
  }
};

export default OnForgotPassword;
