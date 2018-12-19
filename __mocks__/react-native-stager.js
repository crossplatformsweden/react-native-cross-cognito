jest.mock('react-native-stager', () => ({
  __esModule: true,
  Stage: 'View',
  StageButtons: 'View',
  StageProgress: 'View',
  default: 'View'
}));