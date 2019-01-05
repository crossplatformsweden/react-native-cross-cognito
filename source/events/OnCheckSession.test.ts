// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnCheckSession from './OnCheckSession';

jest.unmock('react-native');
jest.unmock('aws-amplify');
jest.unmock('./OnCheckSession');

describe('events', () => {
  describe('OnCheckSession', () => {
    it('When empty object then returns `Unauthenticated`', async (done) => {
      let result = await OnCheckSession({});
      console.log('Result 1 ', result);
      expect(result.state).toBe('Unauthenticated');
      done();
    });

    it('When `getUsername` then returns `Unauthenticated`', async (done) => {
      let result = await OnCheckSession({ getUsername: 'test' });
      expect(result.state).toBe('Unauthenticated');
      done();
    });

    it('When `code` is `UserNotConfirmedException` then returns `ConfirmAccountCodeWaiting`', async (done) => {
      let result = await OnCheckSession({ code: 'UserNotConfirmedException' });
      console.log('Result 3 ', result);
      expect(result.state).toBe('ConfirmAccountCodeWaiting');
      done();
    });
  });
});
