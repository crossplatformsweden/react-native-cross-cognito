import { ICrossButtonProps } from 'react-native-cross-components';
import { ICrossEditorProps } from 'react-native-cross-components';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { ReactNode } from 'react';
/**
 * Properties for the {@link CognitoLogin} component.
 *
 * Allows customization and provides the {@link onLoggedIn} event.
 *
 * Children can be supplied to the forms: {@link registerChildren}, {@link confirmChildren}, {@link forgotChildren}, {@link loginChildren}
 */
export interface ICognitoLoginProps {
  /**
   * Occurs when the user was successfully logged in and contains the resulting user.
   */
  onLoggedIn?: (user: CognitoUser) => void;

  /**
   * Optional props to customize all buttons. Typically used to change the `mode` prop.
   *
   * Read more:
   * https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html
   *
   * @example
   *  <CognitoLogin buttonProps={{mode: 'contained'}}>
   *     <Text>Custom layouts here</Text>
   *  </CognitoLogin>
   */
  buttonProps?: ICrossButtonProps | undefined;
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
  /**
   * Optional child components for the {@link ForgotForm} (reset password)
   */
  forgotChildren?: ReactNode;
  /**
   * Optional child components for the {@link LoginForm} (username / password)
   */
  loginChildren?: ReactNode;
  /**
   * Optional child components for the {@link RegisterForm}
   */
  registerChildren?: ReactNode;
  /**
   * Optional child components for the {@link ConfirmForm}
   */
  confirmChildren?: ReactNode;
}
