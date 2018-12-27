import React from 'react';
import { View } from 'react-native';
import {
  CrossButton,
  Colors,
  ICrossButtonProps,
} from 'react-native-cross-components';
import styles from '../../styles';
import { CrossEditor, ICrossEditorProps } from 'react-native-cross-components';

/**
 * Props for the {@link ConfirmForm} components.
 *
 * Required properties are {@link code} and {@link onConfirmPress}.
 *
 * Allows you to customize {@link initialCode},  {@link confirmButtonProps} and {@link codeInputProps}.
 */
export interface IConfirmFormProps {
  /**
   * Occurs when the user press "confirm" button. Required.
   */
  onConfirmPress: () => void;
  testID?: string;
  /**
   * Optional callback for code changed. Contains code user entered
   */
  onCodeChanged?: (code: string | undefined) => void;
  /**
   * Current user input or undefined. Required.
   */
  code: string | undefined;
  /**
   * Optional props for the code input. Typically used to change the `label` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_input_crosseditor_.icrosseditorprops.html
   *
   * @example
   *  <ConfirmForm codeInputProps={{label: 'WouldntYouLikeToKnow'}}>
   *     <Text>Custom layouts here</Text>
   *  </ConfirmForm>
   */
  codeInputProps?: ICrossEditorProps | undefined;
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
        {this.props.children}
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
