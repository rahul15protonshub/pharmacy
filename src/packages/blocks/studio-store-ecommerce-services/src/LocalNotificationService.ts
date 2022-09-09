//@ts-ignore
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';


class LocalNotificationService {

    configure = (onOpenNotification: any) => {
        PushNotification.configure({
            onRegister: function (token: any) {
                //  console.log('@@@ FCM LOCAL NOTIFICATION SERVICE onRegister ===========', token);
            },
            onNotification: function (notification: any) {
                //  console.log('@@@ FCM LOCAL NOTIFICATION SERVICE onNotification ===========', notification);
                if (!notification.data) {
                    return;
                }
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification);

                if (Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },

            // Android only
            senderID: "60789253831",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
        
        PushNotification.createChannel(
            {
              channelId: "default-channel-id", // (required)
              channelName: "My channel", // (required)
              channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
              playSound: false, // (optional) default: true
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created: any) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
    }

    unregister = () => {
        PushNotification.unregister();
    }

    showNotification = (id: any, title: any, message: any, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /* iOS and Android properties */
            ...this.buildIOSNotification(id, title, message, data, options),
            /* iOS and Android Properties */
            channelId: "default-channel-id",
            title: title || '',
            message: message || '',
            //@ts-ignore
            playSound: options.playSound || false,
            //@ts-ignore
            soundName: options.soundName || 'default',
            userInteraction: false // BOOLEAN: If the notification was opened by the user from the notification.
        })
    }

    buildAndroidNotification = (id: any, title: any, message: any, data = {}, options = {}) => {
        return {
            channelId: "default-channel-id",
            id: id,
            autoCancel: true,
            //@ts-ignore
            largeIcon: options.largeIcon || 'ic_launcher',
            //@ts-ignore
            smallIcon: options.smallIcon || 'ic_notification',
            bigText: message || '',
            subText: title || '',
            //@ts-ignore
            vibrate: options.vibration || 300,
            //@ts-ignore
            priority: options.priority || 'high',
            //@ts-ignore
            importance: options.importance || 'high', //(optional) set notification importance, default: high
            data: data,
        }
    }

    buildIOSNotification = (id: any, title: any, message: any, data = {}, options = {}) => {
        return {
            //@ts-ignore
            alertAction: options.alertAction || 'view',
            //@ts-ignore
            category: options.category || '',
            userInfo: {
                id: id,
                item: data,
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeDeliveredNotificationByID = (notificationId: any) => {
        //  console.log('@@@ FCM LOCAL NOTIFICATION SERVICE Remove Delivered Notification ID ============', notificationId);
        PushNotification.cancelLocalNotifications({ id: `${notificationId}` });
    }
}

export const localNotificationService = new LocalNotificationService();