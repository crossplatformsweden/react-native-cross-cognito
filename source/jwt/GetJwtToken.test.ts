import { Auth } from 'aws-amplify';
import GetJwtToken from './GetJwtToken';

describe('jwt', () => {
  describe('GetJwtToken', () => {
    it('When no session should return `Could not get session`', async () => {
      const result: Error = (await GetJwtToken()) as Error;
      expect(result.message).toBe('Could not get session');
    });

    it('When idToken should return "123"', async () => {
      const spy = jest.spyOn(Auth, 'currentSession').mockImplementation(() => ({
        getIdToken: () => ({
          getJwtToken: () => '123',
        }),
      }));

      const result = await GetJwtToken();
      expect(result).toBe('123');
      spy.mockRestore();
    });

    it('When no idToken should return "Could not get ID token"', async () => {
      const spy = jest.spyOn(Auth, 'currentSession').mockImplementation(() => ({
        getIdToken: jest.fn(),
      }));

      const result: Error = (await GetJwtToken()) as Error;
      expect(result.message).toBe('Could not get ID token');
      spy.mockRestore();
    });
  });
});
