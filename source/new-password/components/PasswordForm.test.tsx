// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import PasswordForm from './PasswordForm';

jest.unmock('react-native');
jest.unmock('./PasswordForm');

// Default export requires this type of mocking
// jest.mock('react-native-stager', () => ({
//   __esModule: true,
//   Stage: 'View',
//   StageButtons: 'View',
//   StageProgress: 'View',
//   default: 'View',
// }));

describe('components', () => {
  describe('<PasswordForm />', () => {
    it('Component should render', () => {
      const wrapper = TestRenderer.create(
        <PasswordForm
          onPasswordChanged={console.log}
          code='testcode'
          onSavePress={console.log}
          onEmailChanged={console.log}
        />
      );
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('`onEmailChanged` should return string', () => {
      let result: string | undefined = undefined;
      const onCalled = (r: string | undefined) => (result = r);
      const wrapper = TestRenderer.create(
        <PasswordForm
          onPasswordChanged={console.log}
          code='testcode'
          onSavePress={console.log}
          onEmailChanged={onCalled}
        />
      );
      const child = wrapper.root.findByProps({ label: 'E-mail' });
      child.props.onChangeText('testcode');

      expect(result).toBe('testcode');
    });

    it('`onPasswordChanged` should return string', () => {
      let result: string | undefined = undefined;
      const onCalled = (r: string | undefined) => (result = r);
      const wrapper = TestRenderer.create(
        <PasswordForm
          onEmailChanged={console.log}
          code='testcode'
          onSavePress={console.log}
          onPasswordChanged={onCalled}
        />
      );
      const child = wrapper.root.findByProps({ label: 'New Password' });
      child.props.onChangeText('testcode');

      expect(result).toBe('testcode');
    });

    it('`onCodeChanged` should return string', () => {
      let result: string | undefined = undefined;
      const onCalled = (r: string | undefined) => (result = r);
      const wrapper = TestRenderer.create(
        <PasswordForm
          onEmailChanged={console.log}
          onPasswordChanged={console.log}
          code='testcode'
          onSavePress={console.log}
          onCodeChanged={onCalled}
        />
      );
      const child = wrapper.root.findByProps({
        label: 'Confirmation code',
      });
      child.props.onChangeText('testcode');

      expect(result).toBe('testcode');
    });

    it('<CrossButton /> onPress should be called', () => {
      let called = false;
      const onCalled = () => (called = !called);

      const wrapper = TestRenderer.create(
        <PasswordForm
          onPasswordChanged={console.log}
          code='testcode'
          onSavePress={onCalled}
          onEmailChanged={console.log}
        />
      );
      const child = wrapper.root.findByProps({ title: 'Save' });
      child.props.onPress();
      expect(called).toBeTruthy();
    });
  });
});
