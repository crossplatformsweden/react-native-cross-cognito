// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import OnLogin from './OnLogin';
import { ICognitoUserVariables } from '../../types';

jest.unmock('react-native');
jest.unmock('aws-amplify');
jest.unmock('./OnLogin');

describe('events', () => {
  describe('OnLogin', () => {
    it('Should login user', async (done) => {
      const input: ICognitoUserVariables = {
        email: 'bogus@bogus.com',
        password: 'noneOfYourBusiness',
      };
      let result = undefined;
      try {
        result = await OnLogin(input);
      } catch (error) {
        console.warn(error);
      }
      console.log(
        '** events > OnLogin > should login user > result > ',
        result
      );
      expect(result).toBeDefined();
      done();
    });
  });
});
