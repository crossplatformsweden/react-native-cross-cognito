// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnLogin from './OnLogin';
import { ICognitoUserVariables } from '../types';

jest.unmock('react-native');
// jest.unmock('aws-amplify');
jest.unmock('./OnLogin');

describe('events', () => {
  describe('OnLogin', () => {
    it('When `input` has values should return `AuthenticationError` ', async (done) => {
      const input: ICognitoUserVariables = {
        email: 'bogus@bogus.com',
        password: 'noneOfYourBusiness',
      };
      const result = await OnLogin(input);
      expect(result.state).toBe('AuthenticationError');
      done();
    });
  });
});
