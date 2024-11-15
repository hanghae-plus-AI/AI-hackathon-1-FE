importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
)
self.addEventListener("install", function (e) {
  self.skipWaiting()
})

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.")
})

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

const app = initializeApp(defaultConfig)
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});