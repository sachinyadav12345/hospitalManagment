import { useSelector } from 'react-redux'
import { Phone, Mail, Calendar, MapPin, User, FileText } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Card from '../ui/Card'

const DoctorDetail = ({ doctor, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth)

  if (!doctor) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const canEdit = user?.role === 'admin' || 
                 (user?.role === 'doctor' && doctor.id === user.id)

  const canDelete = user?.role === 'admin'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start space-x-4">
        <Avatar
          src={doctor.avatar}
          alt={doctor.name}
          size="2xl"
          fallback={doctor.name?.charAt(0)?.toUpperCase()}
        />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
          <p className="text-lg text-teal-600 font-medium">
            {doctor.specialization}
          </p>
          <p className="text-gray-600">
            {doctor.clinicName}
          </p>
          
          <div className="flex space-x-2 mt-4">
            {canEdit && (
              <Button onClick={() => onEdit(doctor)}>
                Edit Profile
              </Button>
            )}
            {canDelete && (
              <Button
                variant="danger"
                onClick={() => onDelete(doctor)}
              >
                Delete Doctor
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">{doctor.phone}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">{doctor.email}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">{doctor.clinicName}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="text-gray-900">{doctor.specialization}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-gray-900">{formatDate(doctor.createdAt)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bio */}
      {doctor.bio && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
            <p className="text-gray-900 whitespace-pre-wrap">{doctor.bio}</p>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Doctors
        </Button>
      </div>
    </div>
  )
}

export default DoctorDetail
