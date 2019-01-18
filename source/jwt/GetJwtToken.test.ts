describe('jwt', () => {
  describe('GetJwtToken', () => {
    afterEach(() => {
      jest.resetModules();
    });

    it('When no session should return `Could not get session`', async () => {
      const { GetJwtToken } = await import('./GetJwtToken');
      const result: Error = (await GetJwtToken()) as Error;
      expect(result.message).toBe('Could not get session');
    });

    it('When idToken should return "123"', async () => {
      jest.doMock('aws-amplify', () => ({
        Auth: {
          currentSession: () => ({
            getIdToken: () => ({
              getJwtToken: () => '123',
            }),
          }),
        },
      }));

      const { GetJwtToken } = await import('./GetJwtToken');
      const result = await GetJwtToken();
      expect(result).toBe('123');
    });

    it('When no idToken should return "Could not get ID token"', async () => {
      jest.doMock('aws-amplify', () => ({
        Auth: {
          currentSession: () => ({
            getIdToken: () => jest.fn(),
          }),
        },
      }));

      const { GetJwtToken } = await import('./GetJwtToken');
      const result: Error = (await GetJwtToken()) as Error;
      expect(result.message).toBe('Could not get ID token');
    });
  });
});
