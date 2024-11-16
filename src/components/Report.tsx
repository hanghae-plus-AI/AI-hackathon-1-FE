import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { COLORS } from '@/const/color'
// Register required elements for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

export default function Report() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  // Sample user data
  const userData = {
    user: {
      id: 12,
      workLifeRatio: '70:30',
      age: 29,
      job: '학생',
      gender: '남자',
      furtherDetails: 'AI 교육과정 수강생',
      preferTask: '',
      WLBscore: '50'
    }
  }

  // Parse work-life ratio
  const [workRatio, lifeRatio] = userData.user.workLifeRatio.split(':').map(Number)
  const currentScore = parseInt(userData.user.WLBscore)

  // Calculate gap between desired and current
  const gap = Math.abs(workRatio - currentScore)

  // Chart.js data and options
  const data = {
    labels: ['Work', 'Life'],
    datasets: [
      {
        label: 'Work-Life Ratio',
        data: [workRatio, lifeRatio],
        backgroundColor: [COLORS[2], COLORS[3]],
        hoverBackgroundColor: [COLORS[2], COLORS[3]],
        borderWidth: 1
      }
    ]
  }

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`
          }
        }
      }
    }
  }

  // Generate recommendations based on user data
  const getRecommendations = () => {
    const recommendations = []

    if (currentScore < workRatio) {
      recommendations.push({
        title: '업무 효율성 개선 필요',
        description: 'AI 교육과정에 더 집중할 수 있는 시간 관리가 필요합니다.'
      })
    }

    if (gap > 20) {
      recommendations.push({
        title: '균형 조정 필요',
        description: '현재 상태와 목표 간의 격차가 큽니다. 점진적인 조정이 필요합니다.'
      })
    }

    if (userData.user.job === '학생') {
      recommendations.push({
        title: '학습-휴식 밸런스',
        description: 'AI 학습에 집중하되, 적절한 휴식으로 학습 효율을 높이세요.'
      })
    }

    return recommendations
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
    <div className="w-full space-y-6">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6" />
            워라벨 현황 대시보드
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">목표 비율</h3>
              <div className="h-48">
                <Doughnut data={data} options={options} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">현재 워라벨 점수</h3>
                <Progress value={currentScore} className="w-full" />
                <p className="mt-1 text-sm text-gray-600">{currentScore}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">목표 대비 격차</h3>
                <Progress value={gap} className="w-full bg-red-100" />
                <p className="mt-1 text-sm text-gray-600">{gap}% 차이</p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-600">직업</p>
                  <p className="font-semibold">{userData.user.job}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">나이</p>
                  <p className="font-semibold">{userData.user.age}세</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">성별</p>
                  <p className="font-semibold">{userData.user.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">세부사항</p>
                  <p className="font-semibold">{userData.user.furtherDetails}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-5 w-5" />
              맞춤 추천사항
            </h3>
            {getRecommendations().map((rec, index) => (
              <Alert key={index}>
                <AlertTitle className="flex items-center gap-2">{rec.title}</AlertTitle>
                <AlertDescription>{rec.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
