import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import Button from '../ui/Button'
import { useCalendarLoading } from '../../utils/loadingUtils.jsx'

const CalendarComponent = ({ selectedDate, onDateSelect, appointments = [], isLoading = false }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date())
  const { getAppointmentCount } = useCalendarLoading(isLoading, appointments)

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const isToday = (date) => {
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const renderDays = () => {
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 w-10"></div>
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const appointmentCount = getAppointmentCount(date)
      const isCurrentDay = isToday(date)
      const isSelectedDay = isSelected(date)

      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(date)}
          className={`
            relative h-10 w-10 rounded-lg text-sm font-medium transition-colors duration-200
            ${isSelectedDay 
              ? 'bg-teal-600 text-white' 
              : isCurrentDay 
                ? 'bg-teal-100 text-teal-700 hover:bg-teal-200' 
                : 'text-gray-700 hover:bg-gray-100'
            }
            ${appointmentCount > 0 ? 'font-semibold' : ''}
          `}
        >
          {day}
          {appointmentCount > 0 && (
            <div className={`
              absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs flex items-center justify-center
              ${isSelectedDay 
                ? 'bg-white text-teal-600' 
                : 'bg-teal-600 text-white'
              }
            `}>
              {appointmentCount}
            </div>
          )}
        </button>
      )
    }

    return days
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
            {monthNames[month]} {year}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>

      {/* Selected date info */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Selected Date
              </p>
              <p className="text-sm text-gray-600">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {getAppointmentCount(selectedDate)} appointments
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarComponent
