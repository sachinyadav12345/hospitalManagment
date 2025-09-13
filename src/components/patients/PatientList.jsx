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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">
            Manage patient records and information
          </p>
        </div>
        
        {canCreatePatient && (
          <Button onClick={() => {
            console.log('Add Patient button clicked, navigating to /patients/new')
            navigate('/patients/new')
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
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
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-teal-100 text-teal-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-teal-100 text-teal-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing {patients.length} of {total} patients
        </p>
        {totalPages > 1 && (
          <p>
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {/* Patient List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : patients.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-300 mb-4">
            <Search className="h-full w-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedDoctor 
              ? 'Try adjusting your search criteria'
              : 'Get started by adding your first patient'
            }
          </p>
        </div>
      ) : (
        <>
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PatientList
