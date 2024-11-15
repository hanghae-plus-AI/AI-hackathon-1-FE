import CustomCalendar from '@/components/CustomCalendar'
import { useEffect, useState } from 'react'
import Report from '@/components/Report.js'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.js'
import { useNavigate } from 'react-router-dom'

export default function DashBoard() {
  const [currentTab, setCurrentTab] = useState<'calendar' | 'report'>('calendar')
  const handleTab = (tab: 'calendar' | 'report') => {
    if (currentTab === tab) {
      return
    }
    setCurrentTab(tab)
  }

  const navigate = useNavigate()
  useEffect(() => {
    const userId = localStorage.getItem('cid')
    if (!userId) {
      navigate('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <header className="flex justify-center">
        <Tabs
          defaultValue="calendar"
          className="h-[58px] w-[624px]"
          onValueChange={(value) => handleTab(value as 'calendar' | 'report')}
        >
          <TabsList>
            <TabsTrigger className="h-[58px] w-[312px]" value="calendar">
              캘린더
            </TabsTrigger>
            <TabsTrigger className="h-[58px] w-[312px]" value="report">
              보고서
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      <section className="w-[1200px] pb-10 pt-10">
        {{ calendar: <CustomCalendar view="month" />, report: <Report /> }[currentTab]}
      </section>
    </main>
  )
}
