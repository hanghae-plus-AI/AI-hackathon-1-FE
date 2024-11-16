import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, isSameDay, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns'

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
    const recommendations = [
        {
          "ts": 1729872000000,
          "title": "스터디 그룹 발표 준비",
          "description": "발표자료 제작 6시간, 리허설 2시간, 피드백 수렴 2시간. 내용 전달력 88%, 발표 준비도 90%. 효과적인 지식 공유 준비. 커뮤니케이션 85%."
        },
        {
          "ts": 1729958400000,
          "title": "모델 배포 파이프라인 구축",
          "description": "CI/CD 구축 7시간, 테스트 코드 작성 4시간, 운동 1시간. 자동화 수준 80%, 코드 신뢰도 85%. 효율적인 배포 환경 조성. 완성도 83%."
        },
        {
          "ts": 1730044800000,
          "title": "AI 윤리 세미나와 토론",
          "description": "세미나 참석 4시간, 그룹 토론 3시간, 관련 자료 조사 2시간. 인사이트 획득 92%, 윤리의식 함양 88%. 다양한 관점 습득. 시야 확장 85%."
        },
        {
          "ts": 1730131200000,
          "title": "데이터 전처리 집중의 날",
          "description": "데이터 정제 8시간, EDA 3시간, 팀 공유 1시간. 데이터 품질 90%, 작업 효율성 85%. 깔끔한 데이터셋 구축. 기초 작업 완성도 88%."
        },
        {
          "ts": 1730217600000,
          "title": "개인 프로젝트 중간 점검",
          "description": "코드 최적화 5시간, 성능 테스트 4시간, 회고 작성 2시간. 목표 달성률 85%, 코드 효율성 88%. 중간 성과 만족. 발전 가능성 92%."
        },
        {
          "ts": 1730304000000,
          "title": "클라우드 인프라 실습의 날",
          "description": "AWS 서비스 학습 6시간, 인프라 구축 4시간, 문서 정리 2시간. 기술 습득률 82%, 실무 적용도 85%. 클라우드 역량 강화. 실용성 90%."
        },
        {
          "ts": 1730390400000,
          "title": "오픈소스 프로젝트 기여 도전",
          "description": "오픈소스 코드 분석 7시간, PR 작성 3시간, 커뮤니티 토론 1시간. 기여도 70%, 소통 능력 75%. 글로벌 협업 경험 축적. 도전 성취도 78%."
        },
        {
          "ts": 1730476800000,
          "title": "코드 리뷰와 멘토링 세션",
          "description": "멘토링 3시간, 코드 개선 5시간, 팀원 피드백 2시간. 코드 품질 향상 88%, 협업 만족도 85%. 건설적인 피드백 교환. 성장률 80%."
        },
        {
          "ts": 1730563200000,
          "title": "GPU 서버 장애로 인한 일정 조정",
          "description": "대체 작업(이론 공부) 6시간, 문서화 3시간, 독서 2시간. 예상치 못한 상황 대처력 85%, 시간 활용도 78%. 유연한 일정 관리 실천. 적응력 82%."
        },
        {
          "ts": 1730649600000,
          "title": "컴퓨터 비전 프로젝트 시작",
          "description": "CNN 모델 학습 8시간, 논문 리뷰 3시간, 운동 1시간. 학습 이해도 75%, 프로젝트 초기 설정 완료. 저녁 운동으로 리프레시. 진행률 15%."
        }
      
    ]

  const [curDes, setCurDes] = useState<{ts: number, title: string, description: string}>()
  useEffect(() => {
    console.log(currentDate)
    const t = recommendations.find(day => {
      console.log(day.ts)
      return isSameDay(day?.ts, currentDate)
    }
      
     )
     console.log(t)
    setCurDes(t)
  }, [currentDate])

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
           
              <Alert >
                <AlertTitle className="flex items-center gap-2">{curDes?.title}</AlertTitle>
                <AlertDescription>{curDes?.description}</AlertDescription>
              </Alert>
            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
