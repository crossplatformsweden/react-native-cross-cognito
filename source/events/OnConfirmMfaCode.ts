import { IAuthenticationResult } from '../types';
import { Auth } from 'aws-amplify';
import _ from 'lodash';
import OnCheckSession from './OnCheckSession';

/**
 * Handles confirm Cognito MFA code event (two-step signin)
 * @param code user MFA code used to signin
 * @param userName the user to confirm
 * @returns See {@link IAuthenticationResult}
 */
export const OnConfirmMfaCode = async (
  code: string,
  userName: string
): Promise<IAuthenticationResult> => {
  try {
    const codeInt = Number(code);
    if (!codeInt || codeInt < 100) {
      throw Error('Not a valid Code');
    }

    console.log('** Cognito: confirm MFA signin code with AWS **');

    await Auth.confirmSignIn(userName, codeInt.toString(), undefined);

    return OnCheckSession();
  } catch (error) {
    // if (__DEV__) console.log(error);
    return { state: 'AuthenticationError', error };
  }
};

export default OnConfirmMfaCode;
