// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import RegisterForm from './RegisterForm';

jest.unmock('react-native');
jest.unmock('./RegisterForm');

// Default export requires this type of mocking
// jest.mock('react-native-stager', () => ({
//   __esModule: true,
//   Stage: 'View',
//   StageButtons: 'View',
//   StageProgress: 'View',
//   default: 'View',
// }));

describe('components', () => {
  describe('<RegisterForm />', () => {
    it('Component should render', () => {
      const wrapper = TestRenderer.create(
        <RegisterForm
          onPhoneChanged={jest.fn()}
          onEmailChanged={jest.fn()}
          onPasswordChanged={jest.fn()}
        />
      );

      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('onEmailChanged should be called with new value', () => {
      let gotText: string | undefined = undefined;
      const onCalled = (val: string | undefined) => (gotText = val);

      const newInput = '111222';

      const wrapper = TestRenderer.create(
        <RegisterForm
          onPhoneChanged={jest.fn()}
          initialEmail='bogus@test'
          onEmailChanged={onCalled}
          onPasswordChanged={jest.fn()}
        />
      );

      const child = wrapper.root.findByProps({ label: 'E-mail' });
      child.props.onChangeText(newInput);

      expect(gotText).toEqual(newInput);
    });

    it('onPhoneChanged should be called with new value', () => {
      let gotText: string | undefined = undefined;
      const onCalled = (val: string | undefined) => (gotText = val);

      const newInput = '111222';

      const wrapper = TestRenderer.create(
        <RegisterForm
          onEmailChanged={jest.fn()}
          initialPhone='bogus@test'
          onPhoneChanged={onCalled}
          onPasswordChanged={jest.fn()}
        />
      );

      const child = wrapper.root.findByProps({ label: 'Phone' });
      child.props.onChangeText(newInput);

      expect(gotText).toEqual(newInput);
    });

    it('onPasswordChanged should be called with new value', () => {
      let gotText: string | undefined = undefined;
      const onCalled = (val: string | undefined) => (gotText = val);

      const newInput = '111222';

      const wrapper = TestRenderer.create(
        <RegisterForm
          onPhoneChanged={jest.fn()}
          initialPassword='bogus@test'
          onEmailChanged={jest.fn()}
          onPasswordChanged={onCalled}
        />
      );

      const child = wrapper.root.findByProps({ secureTextEntry: true });
      child.props.onChangeText(newInput);

      expect(gotText).toEqual(newInput);
    });
  });
});
