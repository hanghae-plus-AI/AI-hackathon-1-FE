import { Route, Routes } from 'react-router-dom'

import './App.css'
import DashBoard from './pages/DashBoard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { setupNotifications } from './lib/firebase'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
