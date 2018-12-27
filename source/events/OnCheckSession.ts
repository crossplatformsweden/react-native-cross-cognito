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
  let user: CognitoUser = cognitoAuthResult as CognitoUser;
  if (_.isNil(session)) {
    session = await Auth.currentSession();
  }

  if (user && user.getUsername) {
    return { state: 'Authenticated', user: cognitoAuthResult as CognitoUser };
  }

  const challengeName: string = _.get(session, 'challengeName') || '';

  if (challengeName === 'SMS_MFA' || challengeName === 'SOFTWARE_TOKEN_MFA') {
    return { state: 'ConfirmLoginMFAWaiting' };
  }

  if (challengeName === 'MFA_SETUP') {
    return { state: 'MFA_SETUP' };
  }

  if (challengeName === 'NEW_PASSWORD_REQUIRED') {
    return { state: 'NEW_PASSWORD_REQUIRED' };
  }

  if (
    _.get(cognitoAuthResult, 'code') === 'UserNotConfirmedException' ||
    _.get(cognitoAuthResult, 'userConfirmed') === false
  ) {
    return { state: 'ConfirmAccountCodeWaiting' };
  }

  return { state: 'Unauthenticated' };
};

export default OnCheckSession;
