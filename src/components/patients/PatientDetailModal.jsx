import { useSelector } from 'react-redux'
import { X, Phone, Mail, Calendar, MapPin, User, FileText } from 'lucide-react'
import Modal from '../ui/Modal'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const PatientDetailModal = ({ patient, isOpen, onClose, onEdit, onDelete }) => {
  const { doctors } = useSelector((state) => state.doctors)
  const { user } = useSelector((state) => state.auth)

  if (!patient) return null

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const canEdit = user?.role === 'admin' || 
                 user?.role === 'staff' ||
                 (user?.role === 'doctor' && patient.assignedDoctorId === user.id)

  const canDelete = user?.role === 'admin' ||
                   (user?.role === 'doctor' && patient.assignedDoctorId === user.id)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start space-x-4">
          <Avatar
            src={patient.photo}
            alt={patient.name}
            size="2xl"
            fallback={patient.name?.charAt(0)?.toUpperCase()}
          />
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-gray-600">
              Age {getAge(patient.dateOfBirth)} • {patient.gender}
            </p>
            
            <div className="flex space-x-2 mt-4">
              {canEdit && (
                <Button onClick={() => onEdit(patient)}>
                  Edit Patient
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="danger"
                  onClick={() => onDelete(patient)}
                >
                  Delete Patient
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{patient.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{patient.email}</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-gray-900">{patient.address}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="text-gray-900">{formatDate(patient.dateOfBirth)}</p>
                </div>
              </div>
              
              {assignedDoctor && (
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Assigned Doctor</p>
                    <p className="text-gray-900">{assignedDoctor.name}</p>
                    <p className="text-sm text-gray-600">{assignedDoctor.specialization}</p>
                  </div>
                </div>
              )}
              
              {patient.lastVisitDate && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Visit</p>
                    <p className="text-gray-900">{formatDate(patient.lastVisitDate)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {patient.notes && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <p className="text-gray-900 whitespace-pre-wrap">{patient.notes}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default PatientDetailModal
