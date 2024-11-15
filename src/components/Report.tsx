import { COLORS } from '@/const/color'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2' // 원하는 차트 종류를 가져오세요.

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Report() {
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
  return (
    <div className="flex h-[800px] max-w-[500px] gap-10">
      <Pie data={data} />
      <div>test</div>
    </div>
  )
}
