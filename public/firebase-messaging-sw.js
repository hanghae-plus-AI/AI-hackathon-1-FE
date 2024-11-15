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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
}

const app = initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})
