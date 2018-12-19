// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnRegister from './OnRegister';
import { ICognitoUserVariables } from '../types';

jest.unmock('react-native');
// jest.unmock('aws-amplify');
jest.unmock('./OnRegister');

describe('events', () => {
  describe('OnRegister', () => {
    it('When `input` has values should return `AuthenticationError` ', async (done) => {
      const input: ICognitoUserVariables = {
        email: 'bogus@bogus.com',
        password: 'noneOfYourBusiness',
      };
      const result = await OnRegister(input);

      expect(result.state).toBe('AuthenticationError');
      done();
    });
  });
});
