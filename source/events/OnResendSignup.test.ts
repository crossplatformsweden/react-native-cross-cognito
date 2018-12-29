// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnResendSignup from './OnResendSignup';

jest.unmock('react-native');
// jest.unmock('aws-amplify');
jest.unmock('./OnResendSignup');

describe('events', () => {
  describe('OnResendSignup', () => {
    it('When `username` is defined should return input', async (done) => {
      const email = 'bogus@bogus.com';
      const result = await OnResendSignup(email);

      expect(result).toBe(email);
      done();
    });

    it('When `username` is undefined should return undefined', async (done) => {
      const result = await OnResendSignup('');
      expect(result).toBeUndefined();
      done();
    });
  });
});
