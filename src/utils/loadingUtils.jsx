import React from 'react'
import { Calendar } from 'lucide-react'

// Reusable Calendar Loading Skeleton Component
export const CalendarLoadingSkeleton = ({ variant = 'week' }) => {
  if (variant === 'week') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
          <div className="flex items-center space-x-3">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Week View Calendar */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="text-center">
              <div className="h-3 bg-gray-200 rounded w-6 mx-auto mb-2"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <div className="h-5 bg-gray-200 rounded-full w-6 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Selected Date Display */}
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="bg-white rounded-lg px-3 py-1">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'month') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-300" />
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="h-8 flex items-center justify-center">
              <div className="h-3 bg-gray-200 rounded w-6"></div>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg mx-auto"></div>
          ))}
        </div>

        {/* Selected date info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// Reusable Appointment Card Loading Skeleton
export const AppointmentCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-14 w-14 rounded-xl bg-gray-200 flex items-center justify-center">
            <Calendar className="h-7 w-7 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded-lg w-32"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <div className="h-4 w-4 bg-gray-200 rounded mr-3"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <div className="h-4 w-4 bg-gray-200 rounded mr-3"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded-xl w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable Appointment List Loading Skeleton
export const AppointmentListSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <AppointmentCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Reusable Loading Hook for Calendar Data
export const useCalendarLoading = (isLoading, appointments = []) => {
  const getAppointmentCount = (date) => {
    if (isLoading) return 0
    const dateStr = date.toISOString().split('T')[0]
    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate).toISOString().split('T')[0]
      return aptDate === dateStr
    }).length
  }

  const getLoadingState = (component) => {
    return {
      isLoading,
      appointments: isLoading ? [] : appointments,
      getAppointmentCount
    }
  }

  return {
    getAppointmentCount,
    getLoadingState,
    isLoading
  }
}

// Reusable Loading States for Different Components
export const LoadingStates = {
  calendar: {
    week: CalendarLoadingSkeleton,
    month: CalendarLoadingSkeleton
  },
  appointments: {
    card: AppointmentCardSkeleton,
    list: AppointmentListSkeleton
  }
}

// Utility function to show loading state based on component type
export const renderLoadingState = (type, variant = 'default', props = {}) => {
  const LoadingComponent = LoadingStates[type]?.[variant]
  
  if (!LoadingComponent) {
    console.warn(`No loading component found for type: ${type}, variant: ${variant}`)
    return null
  }

  return <LoadingComponent {...props} />
}

export default {
  CalendarLoadingSkeleton,
  AppointmentCardSkeleton,
  AppointmentListSkeleton,
  useCalendarLoading,
  LoadingStates,
  renderLoadingState
}
