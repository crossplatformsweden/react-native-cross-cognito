// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnLogin from './OnLogin';
import { ICognitoUserVariables } from '../../types';

jest.unmock('react-native');
jest.unmock('./OnLogin');

describe('events', () => {
  describe('OnLogin', () => {
    it('Component should render', () => {
      const input: ICognitoUserVariables = {
        email: 'bogus@bogus.com',
        password: 'noneOfYourBusiness',
      };
      const result = OnLogin(input);
      expect(result).toBe(input);
    });
  });
});
