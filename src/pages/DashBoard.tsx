import CustomCalendar from '@/components/CustomCalendar'

export default function DashBoard() {
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
