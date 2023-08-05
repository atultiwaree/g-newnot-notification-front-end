import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const requestNotificationPermission = async () => {
  try {
    let x = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
    );
    return x;
  } catch (err) {
    if (_DEV_) console.warn('requestNotificationPermission error: ', err);
  }
};

const App = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const notificationToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      return token;
    };

    notificationToken().then(e => console.log(e));
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    async function onDisplayNotification(x) {
      // Request permissions (required for iOS)
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
      });
    }

    const onMessageReceived = async msg => {
      console.log(':::::::::Notification:::::::::', msg);

      // console.log(msg.notification.body);

      setChat(x => [...x, msg]);

      // console.log(chat);
    };
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
