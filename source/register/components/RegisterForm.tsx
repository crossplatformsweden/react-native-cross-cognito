import React from 'react';
import { View } from 'react-native';
import {
  CrossEditor,
  styles,
  ICrossEditorProps,
} from 'react-native-cross-components';
import { ILoginFormProps } from '../../login/components/LoginForm';

/**
 * Props for the {@link RegisterForm} components. Extends {@link ILoginFormProps}
 *
 * Required props include {@link onEmailChanged}, {@link onPhoneChanged} and {@link onPasswordChanged}.
 *
 * Allows you to customize {@link initialEmail} / phone / password as well as {@link emailInputProps}.
 */
export interface IRegisterFormProps extends ILoginFormProps {
  onPhoneChanged: (password: string | undefined) => void;
  initialPhone?: string | undefined;
  /**
   * Optional props for the phone input. Typically used to change the `label` prop or change the `maskProps`.
   * See {@link ICrossEditorProps}
   */
  phoneInputProps?: ICrossEditorProps | undefined;
}

/**
 * Allows the user to enter user info and passes them back through prop events.
 *
 * Props are {@link IRegisterFormProps}
 */
export class RegisterForm extends React.Component<IRegisterFormProps> {
  render() {
    // TODO: Country selector
    // maskProps={{ type: 'cel-phone', options: { dddMask: '(46)' } }}
    return (
      <View style={[styles.container]}>
        {this.props.children}
        <CrossEditor
          label='E-mail'
          placeholder='E-mail'
          autoCapitalize='none'
          clearButtonMode='always'
          autoCorrect={false}
          value={this.props.initialEmail || ''}
          onChangeText={(text: string) => this.props.onEmailChanged(text)}
          {...this.props.emailInputProps}
        />

        <CrossEditor
          maskProps={{ type: 'cel-phone' }}
          label='Phone'
          autoCorrect={false}
          value={this.props.initialPhone || ''}
          onChangeText={(text: string) => this.props.onPhoneChanged(text)}
          {...this.props.phoneInputProps}
        />
        <CrossEditor
          label='Password'
          clearButtonMode='always'
          secureTextEntry
          value={this.props.initialPassword || ''}
          onChangeText={(text: string) => this.props.onPasswordChanged(text)}
          {...this.props.passwordInputProps}
        />
      </View>
    );
  }
}

export default RegisterForm;
