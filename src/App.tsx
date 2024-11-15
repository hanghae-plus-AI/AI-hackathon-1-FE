import { Route, Routes } from "react-router-dom"

import "./App.css"
import Root from "./pages/Root"
import DashBoard from "./pages/DashBoard"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/main" element={<DashBoard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
