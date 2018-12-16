import React from 'react';
import { ICognitoUserVariables } from './types';

/**
 * Describes user login input
 */
export const CognitoUserInputContext = React.createContext<
  ICognitoUserVariables
>({
  email: undefined,
  password: undefined,
  phone: undefined,
});
