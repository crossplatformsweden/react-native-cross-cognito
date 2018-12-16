import React from 'react';
import { View } from 'react-native';
import {
  CrossEditor,
  styles,
  ICrossEditorProps,
} from 'react-native-cross-components';

/**
 * Props for the {@link LoginForm} components.
 *
 * Required props include {@link onEmailChanged} and {@link onPasswordChanged}.
 *
 * Allows you to customize {@link initialEmail} / password as well as {@link emailInputProps}.
 */
export interface ILoginFormProps {
  onEmailChanged: (email: string | undefined) => void;
  onPasswordChanged: (password: string | undefined) => void;
  initialEmail?: string | undefined;
  initialPassword?: string | undefined;
  /**
   * Optional props for the e-mail input. Typically used to change the `label` prop.
   * See {@link ICrossEditorProps}
   */
  emailInputProps?: ICrossEditorProps | undefined;
  /**
   * Optional props for the password input. Typically used to change the `label` prop.
   * See {@link ICrossEditorProps}
   */
  passwordInputProps?: ICrossEditorProps | undefined;
}

/**
 * Allows the user to ender credentials and passes them back through prop events.
 *
 * Props are {@link ILoginFormProps}
 */
export class LoginForm extends React.Component<ILoginFormProps> {
  render() {
    // TODO: E-mail validation
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
          label='Password'
          clearButtonMode='always'
          secureTextEntry
          value={this.props.initialPassword || ''}
          onChangeText={(text: string) => this.props.onPasswordChanged(text)}
          {...this.props.passwordInputProps}
        />
        {/* <CrossLabel isCaption={true} style={{ color: 'red' }}>{this.props.message}</Caption> */}
      </View>
    );
  }
}

export default LoginForm;
