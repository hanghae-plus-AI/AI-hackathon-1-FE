import { getToken, getMessaging, onMessage } from "firebase/messaging"

import { app, messaging } from "./firebase.js"
import { registerServiceWorker } from "./registerServiceWorker.js"

import "./foregroundMessage.js"

export async function handleAllowNotification() {
  registerServiceWorker()
  try {
    const permission = await Notification.requestPermission()

    onMessage(messaging, (payload) => {
      const notificationTitle = payload.notification.title
      const notificationOptions = {
        body: payload.notification.body,
      }

      if (Notification.permission === "granted") {
        new Notification(notificationTitle, notificationOptions)
      }
    })
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
      })
      if (token) {
        console.log(token)
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요")
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
      )
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error)
  }
}
