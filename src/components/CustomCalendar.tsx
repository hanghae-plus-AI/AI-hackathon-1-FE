import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

import Calendar from '@toast-ui/react-calendar'
import { theme } from '@/theme'
import { TZDate, type EventObject, type ExternalEventTypes } from '@toast-ui/calendar'
import { instance } from '@/service/instance'
import { toast } from 'sonner'

type ViewType = 'month' | 'week' | 'day'

const viewModeOptions = [
  {
    title: '월',
    value: 'month'
  },
  {
    title: '주',
    value: 'week'
  },
  {
    title: '일',
    value: 'day'
  }
]

export default function CustomCalendar({ view }: { view: ViewType }) {
  const calendarRef = useRef<typeof Calendar>(null)
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  const [selectedView, setSelectedView] = useState(view)
  const [events, setEvents] = useState<Partial<EventObject>[]>([])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), [])

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance()
    if (!calInstance) {
      setSelectedDateRangeText('')
    }

    const viewName = calInstance.getViewName()
    const calDate = calInstance.getDate()
    const rangeStart = calInstance.getDateRangeStart()
    const rangeEnd = calInstance.getDateRangeEnd()

    let year = calDate.getFullYear()
    let month = calDate.getMonth() + 1
    let date = calDate.getDate()
    let dateRangeText: string

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}년 ${month}월`
        break
      }
      case 'week': {
        year = rangeStart.getFullYear()
        month = rangeStart.getMonth() + 1
        date = rangeStart.getDate()
        const endMonth = rangeEnd.getMonth() + 1
        const endDate = rangeEnd.getDate()

        const start = `${year}년 ${month < 10 ? '0' : ''}${month}월 ${date < 10 ? '0' : ''}${date}일`
        const end = `${year}년 ${endMonth < 10 ? '0' : ''}${endMonth}월 ${
          endDate < 10 ? '0' : ''
        }${endDate}일`
        dateRangeText = `${start} ~ ${end}`
        break
      }
      default:
        dateRangeText = `${year}년 ${month}월 ${date}일`
    }

    setSelectedDateRangeText(dateRangeText)
  }, [getCalInstance])

  useEffect(() => {
    setSelectedView(view)
  }, [view])

  useEffect(() => {
    updateRenderRangeText()
  }, [selectedView, updateRenderRangeText])

  // TODO: 수정 API + sonner success
  const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (res) => {
    console.group('onAfterRenderEvent')
    console.log()
    console.log('Event Info : ', res)
    console.groupEnd()
  }

  // TODO: 삭제 API + sonner succe
  const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = (res) => {
    console.group('onBeforeDeleteEvent')
    console.log('Event Info : ', res.title)
    console.groupEnd()

    const { id, calendarId } = res

    getCalInstance().deleteEvent(id, calendarId)
  }

  const onChangeSelect = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedView(ev.target.value as ViewType)
  }

  const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
    console.group('onClickDayName')
    console.log('Date : ', res.date)
    console.groupEnd()
  }

  const onClickNavi = (ev: MouseEvent<HTMLButtonElement>) => {
    if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
      const button = ev.target as HTMLButtonElement
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '')
      getCalInstance()[actionName]()
      updateRenderRangeText()
    }
  }

  const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {
    console.group('onClickEvent')
    console.log('MouseEvent : ', res.nativeEvent)
    console.log('Event Info : ', res.event)
    console.groupEnd()
  }

  const onClickTimezonesCollapseBtn: ExternalEventTypes['clickTimezonesCollapseBtn'] = (
    timezoneCollapsed
  ) => {
    console.group('onClickTimezonesCollapseBtn')
    console.log('Is Timezone Collapsed?: ', timezoneCollapsed)
    console.groupEnd()

    const newTheme = {
      'week.daygridLeft.width': '100px',
      'week.timegridLeft.width': '100px'
    }

    getCalInstance().setTheme(newTheme)
  }

  const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (updateData) => {
    console.group('onBeforeUpdateEvent')
    console.log(updateData)
    console.groupEnd()

    const targetEvent = updateData.event
    const changes = { ...updateData.changes }

    getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes)
  }

  const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = (eventData) => {
    const event = {
      calendarId: eventData.calendarId || '',
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? 'allday' : 'time',
      dueDateClass: '',
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate
    }

    instance
      .post('/task', {
        type: 'work',
        title: event.title,
        body: 'test',
        start: new TZDate(event.start).getTime(),
        end: new TZDate(event.end).getTime()
      })
      .then(() => {
        toast.success('저장하였습니다.')
        getCalInstance().createEvents([event])
      })
      .catch(() => {
        toast.error('일정 저장에 실패하였습니다.')
      })
  }

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="render-range">{selectedDateRangeText}</span>
            <span>
              <button
                type="button"
                className="move-prev bg-white"
                data-action="move-prev"
                onClick={onClickNavi}
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className="move-next bg-white"
                data-action="move-next"
                onClick={onClickNavi}
              >
                <ChevronRight />
              </button>
            </span>
          </div>
          <div className="flex items-center justify-center">
            {viewModeOptions.map((option, index) => (
              <div
                key={index}
                className={`${selectedView === option.value ? 'bg-sub-blue text-white' : 'text-black'} rounded-sm border text-center`}
              >
                <label htmlFor={option.value} className="mx-4 my-2">
                  <input
                    id={option.value}
                    type="radio"
                    name="viewMode"
                    className="sr-only"
                    value={option.value}
                    checked={selectedView === option.value}
                    onChange={(event) => onChangeSelect(event)}
                  />
                  {option.title}
                </label>
              </div>
            ))}
            <button
              type="button"
              className="move-today btn flex items-center justify-center rounded-sm border bg-white"
              data-action="move-today"
              onClick={onClickNavi}
            >
              오늘
            </button>
          </div>
        </div>
      </div>
      <Calendar
        height="800px"
        defaultView="month"
        view={selectedView}
        month={{ startDayOfWeek: 1 }}
        events={events}
        template={{
          milestone(event) {
            return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`
          },
          allday(event) {
            return `[All day] ${event.title}`
          }
        }}
        theme={theme}
        timezone={{
          zones: [
            {
              timezoneName: 'Asia/Seoul',
              displayLabel: 'Seoul',
              tooltip: 'UTC+09:00'
            }
          ]
        }}
        useDetailPopup={true}
        useFormPopup={true}
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: false,
          eventView: true,
          taskView: true
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={calendarRef}
        onAfterRenderEvent={onAfterRenderEvent}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
        onClickDayname={onClickDayName}
        onClickEvent={onClickEvent}
        onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeCreateEvent={onBeforeCreateEvent}
      />
    </div>
  )
}
