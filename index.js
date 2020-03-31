/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './js/App'
import { name as appName } from './app.json';
import AppNavigator from './js/navigators/AppNavigator'

AppRegistry.registerComponent(appName, () => App);
//指向AppNavigator导航组件
// AppRegistry.registerComponent(appName, () => AppNavigator);
