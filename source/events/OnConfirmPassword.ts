import { IAuthenticationResult } from '../types';
import { Auth } from 'aws-amplify';
import _ from 'lodash';
import OnCheckSession from './OnCheckSession';

/**
 * Confirm change password flow started by {@link OnForgotPassword}
 * @param code user code used to confirm account
 * @param userName the user to confirm
 * @param newPassword the new password for user
 * @returns See {@link IAuthenticationResult}
 */
export const OnConfirmPassword = async (
  code: string,
  userName: string,
  newPassword: string
): Promise<IAuthenticationResult> => {
  try {
    const codeInt = Number(code);
    if (!codeInt || codeInt < 100) {
      throw Error('Not a valid Code');
    }

    await Auth.forgotPasswordSubmit(userName, codeInt.toString(), newPassword);

    return OnCheckSession();
  } catch (error) {
    // if (__DEV__) console.log(error);
    return OnCheckSession(error);
  }
};

export default OnConfirmPassword;
