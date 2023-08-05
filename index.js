/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import {offPhoneNofiti} from './handleBackgroundNotification';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('\n===Handling Background Notificatin===\n');
  let x = await offPhoneNofiti(remoteMessage?.data?.payload);
  console.log('Passsed to function ', x);
});

// KillState
// messaging().getInitialNotification(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
