import { IAuthenticationResult } from '../types';
import { Auth } from 'aws-amplify';
import _ from 'lodash';
import OnCheckSession from './OnCheckSession';

/**
 * Handles confirm Cognito confirm account event
 * @param code user code used to confirm account
 * @param userName the user to confirm
 * @returns See {@link IAuthenticationResult}
 */
export const OnConfirmAccount = async (
  code: string,
  userName: string
): Promise<IAuthenticationResult> => {
  try {
    const codeInt = Number(code);
    if (!codeInt || codeInt < 100) {
      throw Error('Not a valid Code');
    }

    console.log('** Cognito: confirm MFA signin code with AWS **');

    await Auth.confirmSignUp(userName, codeInt.toString(), undefined);

    return OnCheckSession();
  } catch (error) {
    // if (__DEV__) console.log(error);
    return { state: 'AuthenticationError', error };
  }
};

export default OnConfirmAccount;
