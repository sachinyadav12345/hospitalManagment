import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Plus, Grid, List, Calendar, CalendarDays } from 'lucide-react'
import { fetchAppointments, setPage } from '../../store/slices/appointmentsSlice'
import { fetchDoctors } from '../../store/slices/doctorsSlice'
import { fetchPatients } from '../../store/slices/patientsSlice'
import AppointmentCard from './AppointmentCard'
import DateRangePicker from './DateRangePicker'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { AppointmentListSkeleton, CalendarLoadingSkeleton } from '../../utils/loadingUtils.jsx'
import CalendarComponent from './Calendar'
import WeekViewCalendar from './WeekViewCalendar'

const AppointmentList = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { appointments, total, page, limit, totalPages, isLoading } = useSelector((state) => state.appointments)
  const { doctors } = useSelector((state) => state.doctors)
  const { patients } = useSelector((state) => state.patients)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [dateRange, setDateRange] = useState({})
  const [showCalendarFilter, setShowCalendarFilter] = useState(true) // Default to show calendar
  const [calendarView, setCalendarView] = useState('week') // Default to week view

  useEffect(() => {
    dispatch(fetchDoctors())
    dispatch(fetchPatients())
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    dispatch(fetchAppointments({
      page,
      limit,
      search: debouncedSearch,
      doctorId: selectedDoctor,
      status: selectedStatus,
      selectedDate: selectedDate?.toISOString().split('T')[0],
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    }))
  }, [dispatch, page, limit, debouncedSearch, selectedDoctor, selectedStatus, selectedDate, dateRange])

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage))
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setDateRange({}) // Clear date range when selecting specific date
  }

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    setSelectedDate(null) // Clear selected date when using date range
  }

  const clearDateFilters = () => {
    setSelectedDate(null)
    setDateRange({})
  }

  const doctorOptions = [
    { value: '', label: 'All Doctors' },
    ...doctors.map(doctor => ({
      value: doctor.id,
      label: doctor.name
    }))
  ]

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' }
  ]

  const canCreateAppointment = ['admin', 'doctor', 'staff'].includes(user?.role)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Appointments
            </h1>
            <p className="text-gray-600 text-sm">
              Manage patient appointments efficiently
            </p>
          </div>
          
          {canCreateAppointment && (
            <Button 
              onClick={() => navigate('/appointments/new')}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium text-sm">Schedule Appointment</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select
              options={doctorOptions}
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-48"
            />
            
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-48"
            />

            <Button
              variant="outline"
              onClick={() => setShowCalendarFilter(!showCalendarFilter)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-gray-300 hover:border-teal-500 hover:text-teal-600 transition-all duration-200 ${
                showCalendarFilter ? 'bg-teal-100 text-teal-700 border-teal-300 shadow-md' : ''
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              <span>Calendar Filter</span>
            </Button>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-teal-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-teal-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Filter Section */}
      {showCalendarFilter && (
        <div className="mb-4">
          {/* Calendar View Toggle */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-teal-600" />
                <h3 className="text-lg font-bold text-gray-900">Calendar View</h3>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <Button
                  variant={calendarView === 'week' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setCalendarView('week')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    calendarView === 'week' 
                      ? 'bg-teal-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Week View
                </Button>
                <Button
                  variant={calendarView === 'month' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setCalendarView('month')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    calendarView === 'month' 
                      ? 'bg-teal-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Month View
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar Component */}
          {isLoading ? (
            <CalendarLoadingSkeleton variant={calendarView} />
          ) : calendarView === 'week' ? (
            <WeekViewCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              appointments={appointments}
              onAddAppointment={() => navigate('/appointments/new')}
              onDoctorFilter={(e) => setSelectedDoctor(e.target.value)}
              isLoading={isLoading}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                appointments={appointments}
                isLoading={isLoading}
              />
              <DateRangePicker
                onDateRangeChange={handleDateRangeChange}
                appointments={appointments}
              />
            </div>
          )}
        </div>
      )}

      {/* Active Filters */}
      {(selectedDate || dateRange.startDate || dateRange.endDate) && (
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-teal-800">Active Date Filters:</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearDateFilters}
              className="px-4 py-2 rounded-xl border-teal-300 text-teal-700 hover:bg-teal-100 hover:border-teal-400 transition-all duration-200"
            >
              Clear All
            </Button>
          </div>
          <div className="mt-2 text-sm text-teal-700">
            {selectedDate && (
              <span>Selected Date: {selectedDate.toLocaleDateString()}</span>
            )}
            {dateRange.startDate && dateRange.endDate && (
              <span>Date Range: {dateRange.startDate} to {dateRange.endDate}</span>
            )}
            {dateRange.startDate && !dateRange.endDate && (
              <span>From: {dateRange.startDate}</span>
            )}
            {dateRange.endDate && !dateRange.startDate && (
              <span>Until: {dateRange.endDate}</span>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-teal-100 rounded-lg p-3">
              <Calendar className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {total} Appointment{total !== 1 ? 's' : ''} Found
              </p>
              <p className="text-sm text-gray-600">
                Showing {appointments.length} of {total} appointments
              </p>
            </div>
          </div>
          {totalPages > 1 && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Page {page} of {totalPages}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Appointment List */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <AppointmentListSkeleton count={6} />
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-300 mb-4">
              <Calendar className="h-full w-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-4 text-sm max-w-sm mx-auto">
              {searchTerm || selectedDoctor || selectedStatus
                ? 'Try adjusting your search criteria or clear filters to see all appointments'
                : 'Get started by scheduling your first appointment'
              }
            </p>
            {canCreateAppointment && (
              <Button
                onClick={() => navigate('/appointments/new')}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">Create First Appointment</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className={viewMode === 'grid' ? 'p-6' : 'p-0'}>
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'divide-y divide-gray-200'
            }>
              {appointments.map((appointment) => (
                <div key={appointment.id} className={viewMode === 'list' ? 'p-6 hover:bg-gray-50 transition-colors duration-200' : ''}>
                  <AppointmentCard
                    appointment={appointment}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    variant={viewMode}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 border-t border-gray-200 p-6">
              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border-gray-300 hover:border-teal-500 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                          pageNum === page 
                            ? 'bg-teal-600 text-white shadow-sm' 
                            : 'border-gray-300 hover:border-teal-500 hover:text-teal-600'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border-gray-300 hover:border-teal-500 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AppointmentList
