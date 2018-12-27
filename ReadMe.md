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

[![npm](https://img.shields.io/npm/v/react-native-cross-cognito.svg)](https://www.npmjs.com/package/react-native-cross-cognito) [![npm](https://img.shields.io/npm/dt/react-native-cross-cognito.svg)](https://www.npmjs.com/package/react-native-cross-cognito) [![Build status](https://crossplatformsweden.visualstudio.com/ParkeraApp/_apis/build/status/react-native-cross-cognito-CI)](https://crossplatformsweden.visualstudio.com/ParkeraApp/_build/latest?definitionId=16) ![GitHub](https://img.shields.io/github/license/crossplatformsweden/react-native-cross-cognito.svg)

[![codecov](https://codecov.io/gh/crossplatformsweden/react-native-cross-cognito/branch/master/graph/badge.svg)](https://codecov.io/gh/crossplatformsweden/react-native-cross-cognito) [![dependencies](https://david-dm.org/crossplatformsweden/react-native-cross-cognito/status.svg)](https://david-dm.org/crossplatformsweden/react-native-cross-cognito) [![peer dependencies](https://img.shields.io/david/peer/crossplatformsweden/react-native-cross-cognito.svg)](https://github.com/crossplatformsweden/react-native-cross-cognito) [![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![aws-amplify](https://img.shields.io/badge/AWS%20Amplify-v1.1.17-blue.svg)](https://github.com/aws-amplify/amplify-js) [![aws-amplify-react-native](https://img.shields.io/badge/AWS%20Amplify%20React%20Native-v2.1.5-blue.svg)](https://www.npmjs.com/package/aws-amplify-react-native) [![react-native-cross-components](https://img.shields.io/badge/React%20Native%20Cross%20Components-v0.2.4-blue.svg)](https://github.com/crossplatformsweden/react-native-components)

[![GitHub forks](https://img.shields.io/github/forks/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Fork)](https://github.com/crossplatformsweden/react-native-cross-cognito)
[![GitHub stars](https://img.shields.io/github/stars/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Star)](https://github.com/crossplatformsweden/react-native-cross-cognito) [![GitHub watchers](https://img.shields.io/github/watchers/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Watch)](https://github.com/crossplatformsweden/react-native-cross-cognito) [![Twitter Follow](https://img.shields.io/twitter/follow/crossplatformse.svg?style=social)](https://twitter.com/crossplatformse)

## Table of Contents

- [Crossplatform React-Native Components](#crossplatform-react-native-cross-cognito)
  - [Components](#components)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Components

### CognitoLogin

### GIF HERE

Renders a complete login form using your Amplify token.

For properties and documentation, see **[API reference - Class CognitoLogin](https://crossplatformsweden.github.io/react-native-cross-cognito/classes/_login_components_cognitologin_.cognitologin.html)**.

**Examples**

Login component with default configuration

```typescript
	import { CognitoLogin } from 'react-native-cross-cognito';
	import amplify from './aws-exports';

	Amplify.configure(amplify);

	export const MyComp => () => (
 		<CognitoLogin />
	);
```
