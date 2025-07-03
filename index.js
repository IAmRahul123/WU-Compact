/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/config/countries/i18n';

AppRegistry.registerComponent(appName, () => App);
