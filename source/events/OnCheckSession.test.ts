// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnCheckSession from './OnCheckSession';

jest.unmock('react-native');
jest.unmock('aws-amplify');
jest.unmock('./OnCheckSession');

describe('events', () => {
  describe('OnCheckSession', () => {
    it('When empty object then returns `Unauthenticated`', () => {
      let result = OnCheckSession({});
      expect(result.state).toBe('Unauthenticated');
    });

    it('When `getUsername` then returns `Authenticated`', () => {
      let result = OnCheckSession({ getUsername: 'test' });
      expect(result.state).toBe('Authenticated');
    });

    it('When `code` is `UserNotConfirmedException` then returns `ConfirmAccountCodeWaiting`', () => {
      let result = OnCheckSession({
        code: 'UserNotConfirmedException',
      });
      expect(result.state).toBe('ConfirmAccountCodeWaiting');
    });
  });
});
