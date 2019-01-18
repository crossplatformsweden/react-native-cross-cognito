// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnCheckSession from './OnCheckSession';

jest.unmock('react-native');
jest.unmock('aws-amplify');
jest.unmock('./OnCheckSession');

describe('events', () => {
  describe('OnCheckSession', () => {
    it('When empty object then returns `Unauthenticated`', async () => {
      let result = await OnCheckSession({});
      expect(result.state).toBe('Unauthenticated');
    });

    it('When `getUsername` then returns `Unauthenticated`', async () => {
      let result = await OnCheckSession({ getUsername: 'test' });
      expect(result.state).toBe('Unauthenticated');
    });

    it('When `code` is `UserNotConfirmedException` then returns `ConfirmLoginMFAWaiting`', async () => {
      let result = await OnCheckSession({
        code: 'UserNotConfirmedException',
      });
      expect(result.state).toBe('ConfirmAccountCodeWaiting');
    });

    it('When `code` is `CodeMismatchException` then returns `ConfirmLoginMFAWaiting`', async () => {
      let result = await OnCheckSession({
        code: 'CodeMismatchException',
      });
      expect(result.state).toBe('ConfirmAccountCodeWaiting');
    });

    it('When `challengeName` is `SMS_MFA` then returns `ConfirmLoginMFAWaiting`', async () => {
      let result = await OnCheckSession({ challengeName: 'SMS_MFA' });
      expect(result.state).toBe('ConfirmLoginMFAWaiting');
    });

    it('When `challengeName` is `SOFTWARE_TOKEN_MFA` then returns `ConfirmLoginMFAWaiting`', async () => {
      let result = await OnCheckSession({
        challengeName: 'SOFTWARE_TOKEN_MFA',
      });
      expect(result.state).toBe('ConfirmLoginMFAWaiting');
    });

    it('When `challengeName` is `MFA_SETUP` then returns `MFA_SETUP`', async () => {
      let result = await OnCheckSession({ challengeName: 'MFA_SETUP' });
      expect(result.state).toBe('MFA_SETUP');
    });

    it('When `challengeName` is `NEW_PASSWORD_REQUIRED` then returns `NEW_PASSWORD_REQUIRED`', async () => {
      let result = await OnCheckSession({
        challengeName: 'NEW_PASSWORD_REQUIRED',
      });
      expect(result.state).toBe('NEW_PASSWORD_REQUIRED');
    });
  });
});
