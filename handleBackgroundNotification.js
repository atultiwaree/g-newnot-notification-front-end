import notifee from '@notifee/react-native';

export const offPhoneNofiti = async payload => {
  payload = await JSON.parse(payload);

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'message',
    name: 'Message Channel',
  });

  if (payload?.channel === 'message') {
    await notifee.displayNotification({
      title: payload?.content?.title,
      body: payload?.content?.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  }
};
