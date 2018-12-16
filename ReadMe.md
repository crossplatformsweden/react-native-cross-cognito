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

- **[API Documnentation](https://crossplatformsweden.github.io/react-native-cross-cognito/)**

See **[Components](#components)** below for examples

---

[![npm](https://img.shields.io/npm/v/react-native-cross-cognito.svg)](https://www.npmjs.com/package/react-native-cross-cognito)
[![npm](https://img.shields.io/npm/dt/react-native-cross-cognito.svg)](https://www.npmjs.com/package/react-native-cross-cognito)
[![Build status](https://crossplatformsweden.visualstudio.com/ParkeraApp/_apis/build/status/react-native-cross-cognito-CI)](https://crossplatformsweden.visualstudio.com/ParkeraApp/_build/latest?definitionId=16)

[![codecov](https://codecov.io/gh/crossplatformsweden/react-native-cross-cognito/branch/master/graph/badge.svg)](https://codecov.io/gh/crossplatformsweden/react-native-cross-cognito)
[![dependencies](https://david-dm.org/crossplatformsweden/react-native-cross-cognito/status.svg)](https://david-dm.org/crossplatformsweden/react-native-cross-cognito)
[![peer dependencies](https://img.shields.io/david/peer/crossplatformsweden/react-native-cross-cognito.svg)](https://github.com/crossplatformsweden/react-native-cross-cognito)

[![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

![GitHub](https://img.shields.io/github/license/crossplatformsweden/react-native-cross-cognito.svg)

[![React Native](https://img.shields.io/badge/React%20Native-v0.57-blue.svg)](https://facebook.github.io/react-native/)
[![React Native Paper](https://img.shields.io/badge/React%20Native%20Paper-v2.2.4-blue.svg)](https://github.com/callstack/react-native-paper)
[![React Native Vector Icons](https://img.shields.io/badge/React%20Native%20Vector%20Icons-v4.5.0-blue.svg)](https://github.com/oblador/react-native-vector-icons)

[![GitHub forks](https://img.shields.io/github/forks/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Fork)](https://github.com/crossplatformsweden/react-native-cross-cognito)

[![GitHub stars](https://img.shields.io/github/stars/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Star)](https://github.com/crossplatformsweden/react-native-cross-cognito)

[![GitHub watchers](https://img.shields.io/github/watchers/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Watch)](https://github.com/crossplatformsweden/react-native-cross-cognito)

[![Twitter Follow](https://img.shields.io/twitter/follow/crossplatformse.svg?style=social)](https://twitter.com/crossplatformse)

## Table of Contents

- [Crossplatform React-Native Components](#crossplatform-react-native-cross-cognito)
  - [Components](#components)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Components

### CognitoLogin

### GIF HERE

Renders a complete login form using your Amplify token.

For properties and documentation, see **[API reference - Class CognitoLogin](https://crossplatformsweden.github.io/react-native-cross-cognito/classes/_components_buttons_crossbutton_.crossbutton.html)**.

**Examples**

Login component with default configuration

```typescript
	import { CognitoLogin } from 'react-native-cross-cognito';

	export const MyComp => () => (
 		<CognitoLogin
            amplifyToken="myToken"
          />
	);
```
