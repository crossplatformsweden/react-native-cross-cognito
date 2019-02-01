import React from 'react';
import { View } from 'react-native';
import {
  CrossButton,
  Colors,
  ICrossButtonProps,
} from 'react-native-cross-components';
import styles from '../../styles';
import { CrossEditor } from 'react-native-cross-components';
import {
  IEmailProps,
  IPasswordProps,
  ICodeProps,
  ITestIDProps,
} from '../../types';

/**
 * Props for the {@link PasswordForm} component.
 *
 * Required properties: {@link onSavePress}.
 *
 * Allows you to customize {@link ICodeProps}, {@link IEmailProps} and {@link IPasswordProps}.
 */
export interface IPasswordFormProps
  extends IEmailProps,
    IPasswordProps,
    ICodeProps,
    ITestIDProps {
  /**
   * Occurs when the user press "save" button. Required.
   */
  onSavePress: () => void;
  /**
   * Optional props for the register button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <PasswordForm confirmButtonProps={{title: 'Enlist'}}>
   *     <Text>Custom layouts here</Text>
   *  </PasswordForm>
   */
  saveButtonProps?: ICrossButtonProps | undefined;
}

/**
 * Allows the user to ender credentials and passes them back through prop events.
 *
 * Props are {@link IPasswordFormProps}
 *
 * @example
 *  <PasswordForm
 *      onSavePress={(code) => console.log('Confirmed', code)}
 *      saveButtonProps={{title: 'Enlist'}}
 *      codeInputProps={{label: 'WouldntYouLikeToKnow'}}>
 *     <Text>Custom layouts here</Text>
 *  </PasswordForm>
 */
export class PasswordForm extends React.Component<IPasswordFormProps> {
  render() {
    return (
      <View style={[styles.container]} testID={this.props.testID}>
        {this.props.children}{' '}
        <CrossEditor
          testID='email'
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
          testID='code'
          label='Confirmation code'
          placeholder='Enter the code that was sent to you'
          autoCapitalize='none'
          clearButtonMode='always'
          autoCorrect={false}
          value={this.props.code || ''}
          onChangeText={this.props.onCodeChanged}
          {...this.props.codeInputProps}
        />
        <CrossEditor
          testID='password'
          label='New Password'
          clearButtonMode='always'
          secureTextEntry
          value={this.props.initialPassword || ''}
          onChangeText={(text: string) => this.props.onPasswordChanged(text)}
          {...this.props.passwordInputProps}
        />
        <CrossButton
          style={styles.marginTop10}
          buttonStyle={styles.buttonStyle}
          onPress={async () => await this.props.onSavePress()}
          mode='contained'
          title='Save'
          backgroundColor={Colors.NextButton}
          iconName='sign-in'
          {...this.props.saveButtonProps}
        />
      </View>
    );
  }
}

export default PasswordForm;
