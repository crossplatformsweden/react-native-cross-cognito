// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
import React from 'react';
import TestRenderer from 'react-test-renderer';
import ForgotForm from './ForgotForm';

jest.unmock('react-native');
jest.unmock('./ForgotForm');

// Default export requires this type of mocking
// jest.mock('react-native-stager', () => ({
//   __esModule: true,
//   Stage: 'View',
//   StageButtons: 'View',
//   StageProgress: 'View',
//   default: 'View',
// }));

describe('components', () => {
  describe('<ForgotForm />', () => {
    it('Component should render', () => {
      const wrapper = TestRenderer.create(
        <ForgotForm onSubmit={jest.fn()} onEmailChanged={jest.fn()} />
      );
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    // it('Should have paper <Button />', () => {
    //   const wrapper = TestRenderer.create(<ConfirmForm />);
    //   const child = wrapper.root.findByProps({ mode: 'text' });
    //   expect(child.type).toEqual('View');
    // });

    // it('<FontAwesomeButton /> onPress should be called', () => {
    //   let called = false;
    //   const onCalled = () => (called = !called);

    //   const wrapper = TestRenderer.create(<ConfirmForm />);
    //   const child = wrapper.root.findByProps({ name: 'map' });
    //   child.props.onPress();
    //   expect(called).toBeTruthy();
    // });
  });
});
