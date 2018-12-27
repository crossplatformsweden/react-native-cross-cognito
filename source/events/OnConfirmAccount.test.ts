// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnConfirmMfaCode from './OnConfirmAccount';

jest.unmock('react-native');
// jest.unmock('aws-amplify');
jest.unmock('./OnConfirmAccount');

describe('events', () => {
  describe('OnConfirmAccount', () => {
    it('When `code` has values should return `AuthenticationError` ', async (done) => {
      const result = await OnConfirmMfaCode('myCode', 'test@test.com');
      expect(result.state).toBe('AuthenticationError');
      done();
    });
  });
});
