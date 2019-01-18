// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnForgotPassword from './OnForgotPassword';

jest.unmock('react-native');
// jest.unmock('aws-amplify');
jest.unmock('./OnForgotPassword');

describe('events', () => {
  describe('OnForgotPassword', () => {
    it('When `input` has values should return `Unauthenticated` ', async () => {
      const result = await OnForgotPassword('bogus@bogus.com');

      expect(result.state).toBe('NEW_PASSWORD_REQUIRED');
    });
  });
});
