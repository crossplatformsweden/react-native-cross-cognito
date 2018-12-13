[![Crossplatform](https://crossplatform.se/wp-content/uploads/2018/05/Crossplatform-Sweden-AB-01_web.jpg)](https://www.crossplatform.se/)

<!-- language-all: javascript -->

# Crossplatform React-Native Cognito

React-Native implementation of [AWS Cognito](https://aws.amazon.com/cognito/) and [Amplify SDK](https://aws-amplify.github.io/docs/js/tutorials/building-react-native-apps/) including login screens

## [Show me Components!](#components)

## Install
If not using [Expo](https://www.expo.io/), install with [aws amplify](https://aws-amplify.github.io/docs/js/tutorials/building-react-native-apps/) and link it.

```bash
	npm i aws-amplify
  	npm i aws-amplify-react-native
	npm i react-native-cross-cognito
```

Or if you're hanging with the cool kids

```bash
	yarn add aws-amplify
	yarn add aws-amplify-react-native
	yarn add react-native-cross-cognito
```

## Documentation
See our GitHub Pages generated from code comments. This documentation is also available as intellisense / auto complete.

* **[API Documnentation](https://crossplatformsweden.github.io/react-native-cross-cognito/)**

See **[Components](#components)** below for examples

---

[![npm](https://img.shields.io/npm/v/react-native-cross-components.svg)](https://www.npmjs.com/package/react-native-cross-components) 
[![npm](https://img.shields.io/npm/dt/react-native-cross-components.svg)](https://www.npmjs.com/package/react-native-cross-components) 
[![Build status](https://img.shields.io/azure-devops/build/crossplatformsweden/parkeraapp/15.svg)](https://crossplatformsweden.visualstudio.com/ParkeraApp/_build/latest?definitionId=15) 
[![codecov](https://codecov.io/gh/crossplatformsweden/react-native-components/branch/master/graph/badge.svg)](https://codecov.io/gh/crossplatformsweden/react-native-components) 
[![dependencies](https://david-dm.org/crossplatformsweden/react-native-components/status.svg)](https://david-dm.org/crossplatformsweden/react-native-components) 
[![peer dependencies](https://img.shields.io/david/peer/crossplatformsweden/react-native-components.svg)](https://github.com/crossplatformsweden/react-native-components)
[![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![GitHub](https://img.shields.io/github/license/crossplatformsweden/react-native-components.svg) 

[![React Native](https://img.shields.io/badge/React%20Native-v0.57-blue.svg)](https://facebook.github.io/react-native/) 
[![React Native Paper](https://img.shields.io/badge/React%20Native%20Paper-v2.2.4-blue.svg)](https://github.com/callstack/react-native-paper) 
[![React Native Vector Icons](https://img.shields.io/badge/React%20Native%20Vector%20Icons-v4.5.0-blue.svg)](https://github.com/oblador/react-native-vector-icons) 
[![React Native Indicators](https://img.shields.io/badge/React%20Native%20Indicators-v0.13.0-blue.svg)](https://github.com/n4kz/react-native-indicators) 
[![React Native Modal](https://img.shields.io/badge/React%20Native%20Modal-v7.0.0-blue.svg)](https://github.com/react-native-community/react-native-modal) 

[![GitHub forks](https://img.shields.io/github/forks/crossplatformsweden/react-native-components.svg?style=social&label=Fork)](https://github.com/crossplatformsweden/react-native-components)
[![GitHub stars](https://img.shields.io/github/stars/crossplatformsweden/react-native-components.svg?style=social&label=Star)](https://github.com/crossplatformsweden/react-native-components)
[![GitHub watchers](https://img.shields.io/github/watchers/crossplatformsweden/react-native-components.svg?style=social&label=Watch)](https://github.com/crossplatformsweden/react-native-components)
[![Twitter Follow](https://img.shields.io/twitter/follow/crossplatformse.svg?style=social)](https://twitter.com/crossplatformse)

## Table of Contents
- [Crossplatform React-Native Components](#crossplatform-react-native-components)
  * [Components](#components)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Components
### CognitoLogin

### GIF HERE

Renders an [FontAwesome Button](https://github.com/oblador/react-native-vector-icons#iconbutton-component) if only `iconName` is supplied, else an [Paper Button](https://callstack.github.io/react-native-paper/button.html).

For properties and documentation, see **[API reference - Class CrossButton](https://crossplatformsweden.github.io/react-native-components/classes/_components_buttons_crossbutton_.crossbutton.html)**. 

Styles can be customized using [ButtonStyle, IconStyle and style properties](https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html).

However, react-native-paper is currently missing the option to customize **[fontSize](https://github.com/callstack/react-native-paper/issues/546)**.

**Examples**

Button with **[title](https://crossplatformsweden.github.io/react-native-components/interfaces/_components_modals_crossbusyindicator_.ibusyindicatorprops.html#type)**, but no icon and **[mode](https://crossplatformsweden.github.io/react-native-components/interfaces/_components_buttons_crossbutton_.icrossbuttonprops.html#mode)** *contained* (background color):

```typescript
	import { CrossButton } from 'react-native-cross-components';
	
	export const ButtonComp => () => (
 		<CrossButton
            title="Click me"
            mode="contained"
            onPress={() => OnButtonPress('Pressed button with no icon')}
          />
	);
```