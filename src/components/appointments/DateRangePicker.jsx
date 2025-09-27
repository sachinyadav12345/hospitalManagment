import { useState } from 'react'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import Button from '../ui/Button'

const DateRangePicker = ({ onDateRangeChange, appointments = [] }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)

  const handleStartDateChange = (e) => {
    const date = e.target.value
    setStartDate(date)
    if (date && endDate) {
      onDateRangeChange({ startDate: date, endDate })
    } else if (date) {
      onDateRangeChange({ startDate: date })
    }
  }

  const handleEndDateChange = (e) => {
    const date = e.target.value
    setEndDate(date)
    if (date && startDate) {
      onDateRangeChange({ startDate, endDate: date })
    } else if (date) {
      onDateRangeChange({ endDate: date })
    }
  }

  const clearFilters = () => {
    setStartDate('')
    setEndDate('')
    onDateRangeChange({})
  }

  const getFilteredAppointmentsCount = () => {
    if (!startDate && !endDate) return appointments.length
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null
      
      if (start && end) {
        return aptDate >= start && aptDate <= end
      } else if (start) {
        return aptDate >= start
      } else if (end) {
        return aptDate <= end
      }
      return true
    }).length
  }

  const presetRanges = [
    { label: 'Today', days: 0 },
    { label: 'This Week', days: 7 },
    { label: 'This Month', days: 30 },
    { label: 'Next 7 Days', days: 7, future: true }
  ]

  const applyPreset = (days, future = false) => {
    const today = new Date()
    const start = future ? today : new Date(today.getTime() - (days * 24 * 60 * 60 * 1000))
    const end = future ? new Date(today.getTime() + (days * 24 * 60 * 60 * 1000)) : today
    
    const startStr = start.toISOString().split('T')[0]
    const endStr = end.toISOString().split('T')[0]
    
    setStartDate(startStr)
    setEndDate(endStr)
    onDateRangeChange({ startDate: startStr, endDate: endStr })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">Date Range Filter</h3>
        </div>
        {(startDate || endDate) && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Preset buttons */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Filters:</p>
        <div className="flex flex-wrap gap-2">
          {presetRanges.map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset.days, preset.future)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Date inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results summary */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing appointments for:
          </p>
          <p className="text-sm font-medium text-gray-900">
            {getFilteredAppointmentsCount()} appointments
          </p>
        </div>
        {(startDate || endDate) && (
          <p className="text-xs text-gray-500 mt-1">
            {startDate && endDate 
              ? `${startDate} to ${endDate}`
              : startDate 
                ? `From ${startDate}`
                : `Until ${endDate}`
            }
          </p>
        )}
      </div>
    </div>
  )
}

export default DateRangePicker
