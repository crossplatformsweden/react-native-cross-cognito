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

  let user = session instanceof CognitoUser ? session : undefined;
  if (_.get(session, 'user') && session.user instanceof CognitoUser) {
    user = session.user;
  }

  const isError: boolean = session instanceof Error;

  if (__DEV__) {
    console.log('**** OnCheckSession ****');
    console.log('isError? ' + isError);
    console.log(session);
  }

  let result: IAuthenticationResult;

  if (_.get(user, 'username') && _.get(session, 'userConfirmed') !== false) {
    result = { state: 'Authenticated', user: session as CognitoUser };

    return result;
  }

  const challengeName: string = _.get(session, 'challengeName') || '';

  // MFA code required
  if (challengeName === 'SMS_MFA' || challengeName === 'SOFTWARE_TOKEN_MFA') {
    result = {
      state: 'ConfirmLoginMFAWaiting',
      error: new Error(_.get(session, 'message') || 'Please enter MFA code'),
    };

    return result;
  }

  // Need to setup MFA
  if (challengeName === 'MFA_SETUP') {
    result = {
      state: 'MFA_SETUP',
      error: new Error(_.get(session, 'message') || 'Must setup MFA'),
    };

    return result;
  }

  // Resetting password
  const codeDelivery = _.get(session, ['CodeDeliveryDetails', 'Destination']);
  if (
    challengeName === 'NEW_PASSWORD_REQUIRED' ||
    (!_.isNil(codeDelivery) && !_.isEmpty(codeDelivery))
  ) {
    result = { state: 'NEW_PASSWORD_REQUIRED' };
    return result;
  }

  const code = _.get(session, 'code');

  // Not confirmed
  if (
    code === 'UserNotConfirmedException' ||
    code === 'CodeMismatchException' ||
    _.get(session, 'userConfirmed') === false
  ) {
    result = {
      state: 'ConfirmAccountCodeWaiting',
      user: (user as CognitoUser) || (session as CognitoUser) || undefined,
      error: new Error(_.get(session, 'message') || 'User not confirmed'),
    };

    return result;
  }

  if (!_.isNil(code) && _.get(session, 'message')) {
    // Other codes
    result = { state: 'Unauthenticated', error: new Error(session.message) };
    console.log(
      '*** Cognito OnCheckSession other code: "' + code + '" result:'
    );
    console.log(result);

    return result;
  }

  result = {
    state: isError ? 'AuthenticationError' : 'Unauthenticated',
    error: isError ? session : undefined,
  };

  return result;
};

export default OnCheckSession;
