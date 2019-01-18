// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnConfirmMfaCode from './OnConfirmMfaCode';
import _ from 'lodash';

jest.unmock('react-native');
// jest.unmock('aws-amplify');
jest.unmock('./OnConfirmMfaCode');

describe('events', () => {
  describe('OnConfirmMfaCode', () => {
    it('When valid `code` should return `AuthenticationError` ', async () => {
      const result = await OnConfirmMfaCode('111222', 'test@test.com');
      console.log('*** MFA valid ', result);
      expect(result.state).toBe('Unauthenticated');
    });

    it('When invalid `code` should return `Not a valid Code` ', async () => {
      const result = await OnConfirmMfaCode('myCode', 'test@test.com');
      console.log('**** MFA invalid ', result);
      const message = _.get(result, ['error', 'message']);
      expect(message).toBe('Not a valid Code');
    });
  });
});
