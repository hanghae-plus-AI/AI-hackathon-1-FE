import { Route, Routes } from 'react-router-dom'

import './App.css'
import DashBoard from './pages/DashBoard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from './lib/firebase'
import { useEffect } from 'react'

function App() {
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
      })

      //We can send token to server
      console.log('Token generated : ', token)
    } else if (permission === 'denied') {
      //notifications are blocked
      alert('You denied for the notification')
    }
  }

  onMessage(messaging, (payload) => {
    console.log(payload)
  })

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
