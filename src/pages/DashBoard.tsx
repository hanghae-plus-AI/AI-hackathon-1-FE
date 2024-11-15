import { useEffect } from "react"
import { handleAllowNotification } from "../lib/notificationPermission.js"

export default function DashBoard() {
  useEffect(() => {
    handleAllowNotification()
  }, [])

  return <h1>Welcome To Main Page</h1>
}
