import { CognitoUser } from 'amazon-cognito-identity-js';
import _ from 'lodash';
import { IAuthenticationResult } from '../types';
import { Auth } from 'aws-amplify';

/**
 * Check user authentication state
 * @param cognitoAuthResult optional result of authentication operation.
 * Else `Auth.currentSession()`
 * @returns See {@link IAuthenticationResult}
 */
export const OnCheckSession = async (
  cognitoAuthResult?: CognitoUser | any | undefined
): Promise<IAuthenticationResult> => {
  let session = cognitoAuthResult;
  if (_.isNil(session)) {
    session = await Auth.currentSession();
  }

  let user: CognitoUser = cognitoAuthResult as CognitoUser;
  let error = cognitoAuthResult as Error;

  if (user && user.getUsername) {
    return { state: 'Authenticated', user: cognitoAuthResult as CognitoUser };
  }

  const challengeName: string = _.get(session, 'challengeName') || '';

  if (challengeName === 'SMS_MFA' || challengeName === 'SOFTWARE_TOKEN_MFA') {
    return { state: 'ConfirmLoginMFAWaiting', error };
  }

  if (challengeName === 'MFA_SETUP') {
    return { state: 'MFA_SETUP', error };
  }

  if (challengeName === 'NEW_PASSWORD_REQUIRED') {
    return { state: 'NEW_PASSWORD_REQUIRED', error };
  }

  if (
    _.get(cognitoAuthResult, 'code') === 'UserNotConfirmedException' ||
    _.get(cognitoAuthResult, 'code') === 'CodeMismatchException' ||
    _.get(cognitoAuthResult, 'userConfirmed') === false
  ) {
    return { state: 'ConfirmAccountCodeWaiting', error };
  }

  return { state: error ? 'AuthenticationError' : 'Unauthenticated', error };
};

export default OnCheckSession;
