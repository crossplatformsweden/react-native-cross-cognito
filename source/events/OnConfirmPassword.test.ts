// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnConfirmPassword from './OnConfirmPassword';
import _ from 'lodash';

jest.unmock('react-native');
// jest.unmock('aws-amplify');
jest.unmock('./OnConfirmPassword');

describe('events', () => {
  describe('OnConfirmPassword', () => {
    it('When valid `code` should return `AuthenticationError` ', async (done) => {
      const result = await OnConfirmPassword(
        '111222',
        'test@test.com',
        'topSecret1'
      );
      console.log('*** MFA valid ', result);
      expect(result.state).toBe('Unauthenticated');
      done();
    });

    it('When invalid `code` should return `Not a valid Code` ', async (done) => {
      const result = await OnConfirmPassword(
        'myCode',
        'test@test.com',
        'topSecret1'
      );
      console.log('**** MFA invalid ', result);
      const message = _.get(result, ['error', 'message']);
      expect(message).toBe('Not a valid Code');
      done();
    });
  });
});
