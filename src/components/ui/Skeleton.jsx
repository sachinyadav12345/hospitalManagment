import { Calendar } from 'lucide-react'

const AppointmentCardSkeleton = () => {
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

const AppointmentListSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <AppointmentCardSkeleton key={i} />
      ))}
    </div>
  )
}

const CalendarSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="h-12 bg-gray-200 rounded-xl w-40"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-12 bg-gray-200 rounded-xl w-32"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
        <div className="flex items-center space-x-4">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Week View Calendar */}
      <div className="grid grid-cols-7 gap-6 mb-8">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="text-center">
            <div className="h-4 bg-gray-200 rounded w-8 mx-auto mb-3"></div>
            <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
            <div className="h-6 bg-gray-200 rounded-full w-8 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Selected Date Display */}
      <div className="bg-gray-100 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="bg-white rounded-lg px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AppointmentCardSkeleton, AppointmentListSkeleton, CalendarSkeleton }
