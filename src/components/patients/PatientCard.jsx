import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Edit, Trash2, Phone, Mail, Calendar, MapPin } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Card from '../ui/Card'

const PatientCard = ({ patient, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { doctors } = useSelector((state) => state.doctors)

  const assignedDoctor = doctors.find(doctor => doctor.id === patient.assignedDoctorId)

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const canEdit = user?.role === 'admin' || 
                 user?.role === 'staff' ||
                 (user?.role === 'doctor' && patient.assignedDoctorId === user.id)

  const canDelete = user?.role === 'admin' ||
                   (user?.role === 'doctor' && patient.assignedDoctorId === user.id)

  return (
    <Card hover className="cursor-pointer" onClick={() => navigate(`/patients/${patient.id}`)}>
      <div className="flex items-start space-x-4">
        <Avatar
          src={patient.photo}
          alt={patient.name}
          size="lg"
          fallback={patient.name?.charAt(0)?.toUpperCase()}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {patient.name}
            </h3>
            <div className="flex space-x-2">
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(patient)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(patient)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              Age {getAge(patient.dateOfBirth)} • {patient.gender}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              {patient.phone}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              {patient.email}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {patient.address}
            </div>
          </div>
          
          {assignedDoctor && (
            <div className="mt-3 p-2 bg-teal-50 rounded-lg">
              <p className="text-sm font-medium text-teal-800">
                Assigned Doctor: {assignedDoctor.name}
              </p>
              <p className="text-xs text-teal-600">
                {assignedDoctor.specialization}
              </p>
            </div>
          )}
          
          {patient.notes && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {patient.notes}
              </p>
            </div>
          )}
          
          {patient.lastVisitDate && (
            <div className="mt-3 text-xs text-gray-500">
              Last visit: {formatDate(patient.lastVisitDate)}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default PatientCard
