import { CognitoUser } from 'amazon-cognito-identity-js';
import _ from 'lodash';
import { IAuthenticationResult } from '../types';

/**
 * Check user authentication state
 * @param cognitoAuthResult result of authentication operation
 * @returns See {@link IAuthenticationResult}
 */
export const OnCheckSession = (
  cognitoAuthResult: any
): IAuthenticationResult => {
  if (_.get(cognitoAuthResult, 'getUsername')) {
    return { state: 'Authenticated', user: cognitoAuthResult as CognitoUser };
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
