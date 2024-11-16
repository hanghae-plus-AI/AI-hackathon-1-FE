import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Pie } from 'react-chartjs-2'

import { COLORS } from '@/const/color'
import { format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Report() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const data = {
    labels: ['WORK', 'LIFE'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: [COLORS[0], COLORS[1]],
        borderColor: [COLORS[0], COLORS[1]],
        borderWidth: 1
      }
    ]
  }

  const onClickNavi = (step: 'prev' | 'next' | 'today') => {
    switch (step) {
      case 'prev':
        setCurrentDate(setHours(setMinutes(setSeconds(setMilliseconds(currentDate, 0), 0), 0), -24))
        break
      case 'next':
        setCurrentDate(setHours(setMinutes(setSeconds(setMilliseconds(currentDate, 1), 0), 0), 24))
        break
      case 'today':
        setCurrentDate(setHours(setMinutes(setSeconds(setMilliseconds(today, 0), 0), 0), 0))
        break
    }
  }

  return (
    <div className="h-[800px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="render-range">{format(currentDate, 'yyyy년 MM월 dd일')}</span>
          <span>
            <button
              type="button"
              className="move-prev bg-white"
              data-action="move-prev"
              onClick={() => onClickNavi('prev')}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="move-next bg-white"
              data-action="move-next"
              onClick={() => onClickNavi('next')}
            >
              <ChevronRight />
            </button>
          </span>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="move-today btn flex items-center justify-center rounded-sm border bg-white"
            data-action="move-today"
            onClick={() => onClickNavi('today')}
          >
            오늘
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <div className="max-w-[800px]">
          <Pie data={data} />
        </div>
        <div>test</div>
      </div>
    </div>
  )
}
