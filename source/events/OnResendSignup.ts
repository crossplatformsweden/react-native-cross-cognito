import { Auth } from 'aws-amplify';
import _ from 'lodash';

/**
 * Resend the user's account confirmation code
 * @param username
 * @returns result or undefined
 */
export const OnResendSignup = async (username: string) => {
  if (_.isNil(username) || _.isEmpty(username)) {
    if (__DEV__) console.log('**** OnResendSignup: no username ****');
    return undefined;
  }

  try {
    if (__DEV__) console.log('**** OnResendSignup: send to Cognito ****');
    const result = await Auth.resendSignUp(username);

    if (__DEV__) console.log('**** OnResendSignup: result: ', result);
    return result;
  } catch (error) {
    if (__DEV__) console.log(error);
    return error;
  }
};

export default OnResendSignup;
