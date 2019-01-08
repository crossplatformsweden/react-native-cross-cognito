import { ICrossButtonProps } from 'react-native-cross-components';
import { ICrossEditorProps } from 'react-native-cross-components';
import { CognitoUser } from 'amazon-cognito-identity-js';
/**
 * Properties for the {@link CognitoLogin} component.
 *
 * Allows customization and provides the {@link onLoggedIn} event.
 */
export interface ICognitoLoginProps {
  /**
   * Occurs when the user was successfully logged in and contains the resulting user.
   */
  onLoggedIn?: (user: CognitoUser) => void;
  /**
   * Optional props for the login button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin loginButtonProps={{title: 'Engage'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  loginButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the cancel button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin cancelButtonProps={{title: 'Disengage'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  cancelButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the save button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin saveButtonProps={{title: 'Warp'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  saveButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the register button. Typically used to change the `title` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin registerButtonProps={{title: 'Enlist'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  registerButtonProps?: ICrossButtonProps | undefined;
  /**
   * Optional props for the phone input. Typically used to change the `label` prop or change the `maskProps`.
   * See {@link ICrossEditorProps}
   */
  phoneInputProps?: ICrossEditorProps | undefined;
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