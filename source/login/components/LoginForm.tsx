import React from 'react';
import { View } from 'react-native';
import { CrossEditor, styles } from 'react-native-cross-components';
import { IEmailProps, IPasswordProps } from '../../types';

/**
 * Props for the {@link LoginForm} components.
 *
 * Required props include {@link IEmailProps.onEmailChanged} and {@link IPasswordProps.onPasswordChanged}.
 *
 * Allows you to customize {@link IEmailProps.initialEmail} / password as well as {@link IEmailProps.emailInputProps}.
 */
export interface ILoginFormProps extends IEmailProps, IPasswordProps {}

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
