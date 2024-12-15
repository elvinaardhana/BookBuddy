/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './BottomNav.js';
import App from './CrudBookNav.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
