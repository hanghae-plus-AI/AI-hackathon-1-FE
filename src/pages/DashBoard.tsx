import CustomCalendar from '@/components/CustomCalendar'
import { useEffect } from "react"
import { handleAllowNotification } from "../lib/notificationPermission.js"

export default function DashBoard() {
  useEffect(() => {
    handleAllowNotification()
  }, [])
  return (
    <main>
      <header>header</header>
      <section className="w-[1200px]">
        <CustomCalendar view="month" />
      </section>
      <footer>footer</footer>
    </main>
  )
}
