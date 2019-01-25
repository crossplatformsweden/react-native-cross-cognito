import React from 'react';
import { View } from 'react-native';
import { CrossEditor, styles } from 'react-native-cross-components';
import {
  IPhoneProps,
  IEmailProps,
  IPasswordProps,
  ITestIDProps,
} from '../../types';

/**
 * Props for the {@link RegisterForm} components. Extends {@link ILoginFormProps}
 *
 * Required props are callbacks {@link IEmailProps.onEmailChanged}, {@link IPhoneProps.onPhoneChanged} and {@link IPasswordProps.onPasswordChanged}.
 *
 * Allows you to customize {@link IEmailProps.initialEmail} / phone / password as well as {@link IEmailProps.emailInputProps}.
 */
export interface IRegisterFormProps
  extends IEmailProps,
    IPasswordProps,
    IPhoneProps,
    ITestIDProps {}

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
      <View style={[styles.container]} testID={this.props.testID}>
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
          keyboardType='phone-pad'
          label='Phone'
          autoCorrect={false}
          placeholder='+NN NNN NNN NNN NNN'
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
