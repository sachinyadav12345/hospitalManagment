import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Plus, Grid, List } from 'lucide-react'
import { fetchPatients, setPage } from '../../store/slices/patientsSlice'
import { fetchDoctors } from '../../store/slices/doctorsSlice'
import PatientCard from './PatientCard'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Spinner from '../ui/Spinner'

const PatientList = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { patients, total, page, limit, totalPages, isLoading } = useSelector((state) => state.patients)
  const { doctors } = useSelector((state) => state.doctors)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    dispatch(fetchDoctors())
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    dispatch(fetchPatients({
      page,
      limit,
      search: debouncedSearch,
      doctorId: selectedDoctor
    }))
  }, [dispatch, page, limit, debouncedSearch, selectedDoctor])

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage))
  }

  const doctorOptions = [
    { value: '', label: 'All Doctors' },
    ...doctors.map(doctor => ({
      value: doctor.id,
      label: doctor.name
    }))
  ]

  const canCreatePatient = ['admin', 'doctor', 'staff'].includes(user?.role)
  
  // Debug logging
  console.log('PatientList - User:', user)
  console.log('PatientList - canCreatePatient:', canCreatePatient)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Patients
            </h1>
            <p className="text-gray-600 text-sm">
              Manage patient records efficiently
            </p>
          </div>
          
          {canCreatePatient && (
            <Button 
              onClick={() => {
                console.log('Add Patient button clicked, navigating to /patients/new')
                navigate('/patients/new')
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium text-sm">Add Patient</span>
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
                placeholder="Search patients..."
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

      {/* Results */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-teal-100 rounded-lg p-3">
              <Search className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {total} Patient{total !== 1 ? 's' : ''} Found
              </p>
              <p className="text-sm text-gray-600">
                Showing {patients.length} of {total} patients
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

      {/* Patient List */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col items-center justify-center">
            <Spinner size="lg" />
            <p className="mt-4 text-lg text-gray-600 font-medium">Loading patients...</p>
            <p className="mt-2 text-sm text-gray-500">Please wait while we fetch your data</p>
          </div>
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-300 mb-4">
              <Search className="h-full w-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600 mb-4 text-sm max-w-sm mx-auto">
              {searchTerm || selectedDoctor
                ? 'Try adjusting your search criteria or clear filters to see all patients'
                : 'Get started by adding your first patient'
              }
            </p>
            {canCreatePatient && (
              <Button
                onClick={() => navigate('/patients/new')}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">Add First Patient</span>
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
              {patients.map((patient) => (
                <div key={patient.id} className={viewMode === 'list' ? 'p-6 hover:bg-gray-50 transition-colors duration-200' : ''}>
                  <PatientCard
                    patient={patient}
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

export default PatientList
