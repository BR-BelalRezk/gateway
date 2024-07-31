// // public/firebase-messaging-sw.js
// importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyDFNsQY-4qG8jyJh88VB29iX28yHrn-7go",
//     authDomain: "gateway-9bd56.firebaseapp.com",
//     databaseURL: "https://gateway-9bd56-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "gateway-9bd56",
//     storageBucket: "gateway-9bd56.appspot.com",
//     messagingSenderId: "1097963311636",
//     appId: "1:1097963311636:web:1d2f2defd14e498ddfcd01"
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   //console.log('Received background message:', payload);
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

