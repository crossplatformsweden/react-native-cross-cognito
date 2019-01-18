import { Auth } from 'aws-amplify';
import _ from 'lodash';

/**
 * Get the JWT tokem for current user session from AWS Cognito.
 *
 * @returns JWT token string if successful.
 * @return Error if no session or no ID token in session
 */
export const GetJwtToken = async () => {
  console.log('** Cognito: getting session **');
  const session = await Auth.currentSession();
  console.log('Session: ', session);
  if (_.isNil(session)) {
    return new Error('Could not get session');
  }

  const idToken = session.getIdToken();
  console.log('idToken: ', idToken);
  if (_.isNil(idToken) || _.isNil(idToken.getJwtToken)) {
    return new Error('Could not get ID token');
  }

  return idToken.getJwtToken();
};

export default GetJwtToken;
