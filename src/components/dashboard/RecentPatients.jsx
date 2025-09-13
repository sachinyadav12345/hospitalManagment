import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchPatients } from '../../store/slices/patientsSlice'
import { Users, Calendar, Phone, Mail } from 'lucide-react'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const RecentPatients = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients, isLoading } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(fetchPatients({ limit: 5 }))
  }, [dispatch])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/patients')}
        >
          View All
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      ) : patients.length === 0 ? (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No patients found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors cursor-pointer"
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <Avatar
                src={patient.photo}
                alt={patient.name}
                size="md"
                fallback={patient.name?.charAt(0)?.toUpperCase()}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {patient.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    Age {getAge(patient.dateOfBirth)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Phone className="h-3 w-3 mr-1" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Mail className="h-3 w-3 mr-1" />
                    {patient.email}
                  </div>
                </div>
                
                {patient.lastVisitDate && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Last visit: {formatDate(patient.lastVisitDate)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default RecentPatients
