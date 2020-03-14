/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import WelcomepPage from './js/page/WelcomePage'
import { name as appName } from './app.json';
import AppNavigator from './js/navigators/AppNavigator'

// AppRegistry.registerComponent(appName, () => App);
//指向AppNavigator导航组件
AppRegistry.registerComponent(appName, () => AppNavigator);
