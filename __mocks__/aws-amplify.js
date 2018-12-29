// If the mock doesn't work, use the following in your test file:
// jest.mock('react-native-modal-datetime-picker', () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

module.exports = {
  __esModule: true,
  default: jest.fn(),
  Auth: {
    signUp: () => {
      throw new Error('No userPool');
    },
    signIn: () => {
      throw new Error('No userPool');
    },
    resendSignUp: (username) => username,
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
    currentSession: jest.fn(),
    currentUserInfo: jest.fn(),
    confirmSignUp: jest.fn(),
    confirmSignIn: jest.fn(),
    signOut: jest.fn(),
    currentAuthenticatedUser: jest.fn(),
    changePassword: jest.fn(),
  },
  Analytics: {
    record: jest.fn(),
  },
};
