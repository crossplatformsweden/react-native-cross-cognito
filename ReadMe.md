[![Crossplatform](https://crossplatform.se/wp-content/uploads/2018/05/Crossplatform-Sweden-AB-01_web.jpg)](https://www.crossplatform.se/)

<!-- language-all: javascript -->

# Crossplatform React-Native Cognito

React-Native implementation of [AWS Cognito](https://aws.amazon.com/cognito/) and [Amplify SDK](https://aws-amplify.github.io/docs/js/start?ref=amplify-rn-btn&platform=react-native#step-4-integrate-aws-resources) including login screens

## [Show me Components!](#components)

## Install

This package makes use of our **[react-native-cross-components](https://github.com/crossplatformsweden/react-native-components)** that are based on on `react-native-paper`. Paper which is therefore a peer dependency.

### Native

Install with [aws amplify](https://aws-amplify.github.io/docs/js/tutorials/building-react-native-apps/) and link it.

```bash
	npm i react-native-vector-icons
	npm i aws-amplify
	npm i react-native-paper
	npm i react-native-cross-cognito

	# one liner
	npm i react-native-vector-icons aws-amplify react-native-paper react-native-cross-cognito
```

```bash
	yarn add react-native-vector-icons
	yarn add aws-amplify
	yarn add react-native-paper
	yarn add react-native-cross-cognito

	# one liner
	yarn add react-native-vector-icons aws-amplify react-native-paper react-native-cross-cognito
```

### Expo prev CRNA

```bash
	npm i react-native-cross-cognito
```

```bash
	yarn add react-native-cross-cognito
```

## Documentation

See our GitHub Pages generated from code comments. This documentation is also available as intellisense / auto complete.

- **[API Documentation](https://crossplatformsweden.github.io/react-native-cross-cognito/)**

See **[Components](#components)** below for examples

---

[![npm](https://img.shields.io/npm/v/react-native-cross-cognito.svg)](https://www.npmjs.com/package/react-native-cross-cognito) [![npm](https://img.shields.io/npm/dt/react-native-cross-cognito.svg)](https://www.npmjs.com/package/react-native-cross-cognito) [![Build status](https://crossplatformsweden.visualstudio.com/ParkeraApp/_apis/build/status/react-native-cross-cognito-CI)](https://crossplatformsweden.visualstudio.com/ParkeraApp/_build/latest?definitionId=16) ![GitHub](https://img.shields.io/github/license/crossplatformsweden/react-native-cross-cognito.svg)

[![codecov](https://codecov.io/gh/crossplatformsweden/react-native-cross-cognito/branch/master/graph/badge.svg)](https://codecov.io/gh/crossplatformsweden/react-native-cross-cognito) [![dependencies](https://david-dm.org/crossplatformsweden/react-native-cross-cognito/status.svg)](https://david-dm.org/crossplatformsweden/react-native-cross-cognito) [![peer dependencies](https://img.shields.io/david/peer/crossplatformsweden/react-native-cross-cognito.svg)](https://github.com/crossplatformsweden/react-native-cross-cognito) [![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![aws-amplify](https://img.shields.io/badge/AWS%20Amplify-v1.1.17-blue.svg)](https://github.com/aws-amplify/amplify-js) [![react-native-cross-components](https://img.shields.io/badge/React%20Native%20Cross%20Components-v0.2.7-blue.svg)](https://github.com/crossplatformsweden/react-native-components)

[![GitHub forks](https://img.shields.io/github/forks/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Fork)](https://github.com/crossplatformsweden/react-native-cross-cognito)
[![GitHub stars](https://img.shields.io/github/stars/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Star)](https://github.com/crossplatformsweden/react-native-cross-cognito) [![GitHub watchers](https://img.shields.io/github/watchers/crossplatformsweden/react-native-cross-cognito.svg?style=social&label=Watch)](https://github.com/crossplatformsweden/react-native-cross-cognito) [![Twitter Follow](https://img.shields.io/twitter/follow/crossplatformse.svg?style=social)](https://twitter.com/crossplatformse)

## Table of Contents

- [Install](#install)
  - [Native](#native)
  - [Expo prev CRNA](#expo-prev-crna)
- [Documentation](#documentation)
- [Services and helpers](#services-and-helpers)
  - [GetJwtToken](#getjwttoken)
- [Components](#components)
  - [CognitoLogin](#cognitologin)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Services and helpers

### GetJwtToken

Gets the current user's Jwt token from AWS Cognito.

For documentation see **[API reference - GetJwtToken](https://crossplatformsweden.github.io/react-native-cross-cognito/modules/_jwt_getjwttoken_.html)**.

```typescript
import { GetJwtToken } from 'react-native-cross-cognito';

const myToken = await GetJwtToken();
```

## Components

### CognitoLogin

![](https://media.giphy.com/media/TGMBAkTYs1Xhojabxl/giphy.gif)

Renders a complete login form using your Amplify token.

For properties and documentation, see **[API reference - Class CognitoLogin](https://crossplatformsweden.github.io/react-native-cross-cognito/classes/_login_components_cognitologin_.cognitologin.html)**.

**Examples**

With success callback

```typescript
	import { CognitoLogin } from 'react-native-cross-cognito';
	import amplify from './aws-exports';

	Amplify.configure(amplify);

	export const MyComp => () => (
		<CognitoLogin
			onRegisteredUser={(user) => {
				Alert.alert('Registration complete', 'Thank you ' + user.getUsername());
			}}
			onLoggedIn={(user) => {
				Alert.alert('Logged in', 'Welcome ' + user.getUsername());			}} />
	);
```

Set initial form

```typescript
	import { CognitoLogin } from 'react-native-cross-cognito';
	import amplify from './aws-exports';

	Amplify.configure(amplify);

	export const MyComp => () => (
		<CognitoLogin activeForm='Register' />
	);
```

With button customizations

```typescript
	import { CognitoLogin } from 'react-native-cross-cognito';
	import amplify from './aws-exports';

	Amplify.configure(amplify);

	export const MyComp => () => (
        <CognitoLogin
          buttonProps={{ mode: 'text' }}
          loginButtonProps={{ mode: 'contained', title: 'ENGAGE!' }}
          />
	);
```

With custom children

```typescript
	import { CognitoLogin } from 'react-native-cross-cognito';
	import amplify from './aws-exports';

	Amplify.configure(amplify);

	export const MyComp => () => (
        <CognitoLogin
          registerChildren={
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                margin: 10,
                fontSize: 16,
              }}
            >
              &lt;ENLIST NOW&gt;
            </Text>
          }
        >
          <Text
            style={{
              color: 'red',
              fontWeight: 'bold',
              margin: 10,
              fontSize: 16,
            }}
          >
            * &lt;WARNING: RESTRICTED AREA&gt; :)
          </Text>
        </CognitoLogin>
	);
```
