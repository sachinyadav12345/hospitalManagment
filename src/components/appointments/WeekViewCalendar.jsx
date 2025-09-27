import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, List } from 'lucide-react'
import Button from '../ui/Button'
import { useCalendarLoading } from '../../utils/loadingUtils.jsx'

const WeekViewCalendar = ({ selectedDate, onDateSelect, appointments = [], onAddAppointment, onDoctorFilter, isLoading = false }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date())
  const { getAppointmentCount } = useCalendarLoading(isLoading, appointments)
  
  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // Get the start of the week (Monday)
  const getWeekStart = (date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(d.setDate(diff))
  }

  const getWeekDates = (date) => {
    const start = getWeekStart(date)
    const dates = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      dates.push(d)
    }
    return dates
  }

  const navigateWeek = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() + (direction * 7))
      return newDate
    })
  }

  const isToday = (date) => {
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const weekDates = getWeekDates(currentDate)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      {/* Header with Add button and Doctor filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onAddAppointment}
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <CalendarIcon className="h-4 w-4" />
            <Plus className="h-4 w-4" />
            <span className="font-medium">Add Appointment</span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select 
              onChange={onDoctorFilter}
              className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <option value="">All doctors</option>
              <option value="doctor1">Dr. Smith</option>
              <option value="doctor2">Dr. Johnson</option>
              <option value="doctor3">Dr. Brown</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:shadow-md">
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateWeek(-1)}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:shadow-md transform hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-bold text-gray-900 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            {monthNames[month]} {year}
          </h2>
          <button className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            W
          </button>
        </div>
        
        <button
          onClick={() => navigateWeek(1)}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:shadow-md transform hover:scale-105"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Week View Calendar */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDates.map((date, index) => {
          const appointmentCount = getAppointmentCount(date)
          const isCurrentDay = isToday(date)
          const isSelectedDay = isSelected(date)
          const dayName = dayNames[index]
          const dayNumber = date.getDate()

          return (
            <div key={date.toISOString()} className="text-center group">
              {/* Day Name */}
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                {dayName}
              </div>
              
              {/* Date Circle */}
              <button
                onClick={() => onDateSelect(date)}
                className={`
                  relative w-12 h-12 rounded-full text-sm font-bold transition-all duration-300 mb-2 transform hover:scale-110
                  ${isSelectedDay 
                    ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-200' 
                    : isCurrentDay 
                      ? 'bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700 hover:from-teal-200 hover:to-teal-300 shadow-md' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-sm hover:shadow-md'
                  }
                `}
              >
                {dayNumber}
                {isSelectedDay && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                )}
              </button>
              
              {/* Appointment Count */}
              {appointmentCount > 0 && (
                <div className={`
                  text-xs font-bold px-2 py-1 rounded-full shadow-sm transition-all duration-200 group-hover:scale-105
                  ${isSelectedDay 
                    ? 'bg-white text-red-500 shadow-md' 
                    : appointmentCount >= 6 
                      ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700'
                      : appointmentCount >= 4 
                        ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
                        : 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700'
                  }
                `}>
                  {appointmentCount}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Selected Date
              </p>
              <p className="text-lg font-bold text-gray-800">
                {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} / {selectedDate.getFullYear()}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white rounded-lg px-3 py-1 shadow-sm">
                <p className="text-xs font-semibold text-gray-600">
                  {getAppointmentCount(selectedDate)} appointments
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeekViewCalendar
