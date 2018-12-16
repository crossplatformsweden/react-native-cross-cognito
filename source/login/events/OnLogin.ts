import { ICognitoUserVariables } from '../../types';

/**
 * Handles user login event
 * @param input See {@link ICognitoUserVariables}
 */
export const OnLogin = (input: ICognitoUserVariables) => {
  return input;
};

export default OnLogin;
