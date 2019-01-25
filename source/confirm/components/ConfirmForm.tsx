import React from 'react';
import { View } from 'react-native';
import {
  CrossButton,
  Colors,
  ICrossButtonProps,
} from 'react-native-cross-components';
import styles from '../../styles';
import { CrossEditor } from 'react-native-cross-components';
import { IEmailProps, ICodeProps, ITestIDProps } from '../../types';

/**
 * Props for the {@link ConfirmForm} component.
 *
 * Required properties: {@link onConfirmPress}.
 *
 * Allows you to customize {@link ICodeProps} and {@link IEmailProps}.
 */
export interface IConfirmFormProps
  extends IEmailProps,
    ICodeProps,
    ITestIDProps {
  /**
   * Occurs when the user press "confirm" button. Required.
   */
  onConfirmPress: () => void;
  /**
   * Optional props for the register button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <ConfirmForm confirmButtonProps={{title: 'Enlist'}}>
   *     <Text>Custom layouts here</Text>
   *  </ConfirmForm>
   */
  confirmButtonProps?: ICrossButtonProps | undefined;
}

/**
 * Allows the user to ender credentials and passes them back through prop events.
 *
 * Props are {@link IConfirmFormProps}
 *
 * @example
 *  <ConfirmForm
 *      onConfirmPress={(code) => console.log('Confirmed', code)}
 *      confirmButtonProps={{title: 'Enlist'}}
 *      codeInputProps={{label: 'WouldntYouLikeToKnow'}}>
 *     <Text>Custom layouts here</Text>
 *  </ConfirmForm>
 */
export class ConfirmForm extends React.Component<IConfirmFormProps> {
  render() {
    return (
      <View style={[styles.container]} testID={this.props.testID}>
        {this.props.children}{' '}
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
          label='Confirmation code'
          placeholder='Enter the code that was sent to you'
          autoCapitalize='none'
          clearButtonMode='always'
          autoCorrect={false}
          value={this.props.code || ''}
          onChangeText={this.props.onCodeChanged}
          {...this.props.codeInputProps}
        />
        <CrossButton
          style={styles.marginTop10}
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onConfirmPress}
          mode='contained'
          title='Confirm'
          backgroundColor={Colors.NextButton}
          iconName='sign-in'
          {...this.props.confirmButtonProps}
        />
      </View>
    );
  }
}

export default ConfirmForm;
