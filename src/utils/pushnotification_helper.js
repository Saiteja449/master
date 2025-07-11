// import messaging from "@react-native-firebase/messaging";
// import PushNotification from 'react-native-push-notification';
// import { Alert, Platform } from 'react-native';

// messaging().requestPermission()
//     .then(authStatus => {
//         const enabled =
//             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//             authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (enabled) {
//             console.log('Authorization status:', authStatus);
//         }
//     });

// export const getFCMTOKEN = async () => {
//     try {
//         const token = await messaging().getToken();
//         console.warn(token)
//         return token; // Correctly returning the token here
//     } catch (error) {
//         console.error('Error getting FCM Token:', error);
//         return null; // Return null or handle error appropriately
//     }
// }

// // Handle background messages
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
// });

// // Handle foreground messages
// // messaging().onMessage(async remoteMessage => {
// //     console.log('A new FCM message arrived!', remoteMessage);
// // });

// // Create a notification channel
// PushNotification.createChannel(
//     {
//         channelId: "11111", // Unique identifier for the channel
//         channelName: "Default Channel", // User-visible name of the channel
//         channelDescription: "A default channel", // Optional description
//         soundName: "default", // Default notification sound
//         importance: 4, // Importance level for notifications
//         vibrate: true, // Enable vibration for notifications
//     },
//     (created) => console.log(`createChannel returned '${created}'`) // Log to see if the channel was created
// );

// messaging().onMessage(async remoteMessage => {
//     console.log('A new FCM message arrived!', remoteMessage);

//     // Show an alert (for debugging)
//     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

//     // Extract notification details from the FCM message
//     const { notification } = remoteMessage;

//     // Manually trigger a local notification if the app is in the foreground
//     if (notification) {
//         PushNotification.localNotification({
//             channelId: "11111", // Specify the channel ID
//             title: notification.title,
//             message: notification.body,
//             bigText: notification.body, // Optional, for larger messages
//             priority: 'high', // High priority to show the notification immediately
//             playSound: true,
//             soundName: 'default',
//             importance: 'high',
//         });
//     }
// });

// Import dependencies
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import { Alert, Platform } from 'react-native';
import { getApps, initializeApp } from 'firebase/app';
import firebase from '@react-native-firebase/app';
// import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAD_TqXyZZHwk4cN3FDIcpQ33hfdbHdrps',
  authDomain: 'petsfolio-2204f.firebaseapp.com',
  projectId: 'petsfolio-2204f',
  storageBucket: 'petsfolio-2204f.firebasestorage.app',
  messagingSenderId: '941943976685',
  appId: '1:941943976685:android:07c5d772412dff182812e4',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// let app;
// if (!getApps().length) {
//     app = initializeApp(firebaseConfig);
//     // const analytics = getAnalytics(app);
//     console.log("Firebase initialized successfully.");
// } else {
//     app = getApps()[0]; // Use the existing Firebase app instance
//     console.log("Using existing Firebase app instance.");
// }

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export default app;

// const analytics = getAnalytics(app);

messaging()
  .requestPermission()
  .then(authStatus => {
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  });

export const getFCMTOKEN = async () => {
  try {
    const token = await messaging().getToken();
    console.warn(token);
    return token; // Correctly returning the token here
  } catch (error) {
    console.error('Error getting FCM Token:', error);
    return null; // Return null or handle error appropriately
  }
};

// Handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Handle foreground messages
// messaging().onMessage(async remoteMessage => {
//     console.log('A new FCM message arrived!', remoteMessage);
// });

// Create a notification channel
// PushNotification.createChannel(
//     {
//         channelId: "11111", // Unique identifier for the channel
//         channelName: "Default Channel", // User-visible name of the channel
//         channelDescription: "A default channel", // Optional description
//         soundName: "default", // Default notification sound
//         importance: 4, // Importance level for notifications
//         vibrate: true, // Enable vibration for notifications
//     },
//     (created) => console.log(`createChannel returned '${created}'`) // Log to see if the channel was created
// );

messaging().onMessage(async remoteMessage => {
  console.log('A new FCM message arrived!', remoteMessage);

  // Show an alert (for debugging)
  // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

  // Extract notification details from the FCM message
  const { notification } = remoteMessage;

  // Manually trigger a local notification if the app is in the foreground
  if (notification) {
    // PushNotification.localNotification({
    //     channelId: "11111", // Specify the channel ID
    //     title: notification.title,
    //     message: notification.body,
    //     bigText: notification.body, // Optional, for larger messages
    //     priority: 'high', // High priority to show the notification immediately
    //     playSound: true,
    //     soundName: 'default',
    //     importance: 'high',
    // });
  }
});
