import React from 'react';
import { View } from 'react-native';
import {
  CrossEditor,
  CrossButton,
  ICrossButtonProps,
} from 'react-native-cross-components';
import styles from '../../styles';
import { IEmailProps } from '../../types';
import { Colors } from 'react-native-cross-components';

/**
 * Properties for {@link ForgotForm} component. Required prop is {@link onSubmit}.
 */
export interface IForgotFormProps extends IEmailProps {
  /**
   * Occurs when the user clicks "reset password" button. Required.
   */
  onSubmit: () => void;
  /**
   * Optional props for the submit button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <ForgotForm buttonProps={{title: 'Warp'}}>
   *     <Text>Custom layouts here</Text>
   *  </ForgotForm>
   */
  buttonProps?: ICrossButtonProps | undefined;
  testID: string;
}

/**
 * Allows the user to input e-mail and press "Resend password" button.
 *
 * Expects {@link IForgotFormProps.onSubmit} callback event.
 *
 * Properties are {@link IForgotFormProps}.
 */
export class ForgotForm extends React.Component<IForgotFormProps> {
  render() {
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
        <CrossButton
          style={styles.marginTop10}
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onSubmit}
          mode='contained'
          title='Reset password'
          backgroundColor={Colors.NextButton}
          {...this.props.buttonProps}
        />
      </View>
    );
  }
}

export default ForgotForm;
