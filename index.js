/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './js/App'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
//指向AppNavigator导航组件
// AppRegistry.registerComponent(appName, () => AppNavigator);
