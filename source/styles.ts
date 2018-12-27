import { StyleSheet } from 'react-native';
import { styles as coreStyles } from 'react-native-cross-components';

/**
 * Shared styles in react-native-cross-cognito
 */
const customStyles = StyleSheet.create({
  marginTop10: { marginTop: 10 },
  buttonStyle: { margin: 0, minHeight: 45 },
});

const styles = { ...customStyles, ...coreStyles };

export default styles;
