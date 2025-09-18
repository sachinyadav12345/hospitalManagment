import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Edit, Trash2, Phone, Mail, MapPin, Calendar } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Card from '../ui/Card'

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const canEdit = user?.role === 'admin' || 
                 (user?.role === 'doctor' && doctor.id === user.id)

  const canDelete = user?.role === 'admin'

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card hover className="cursor-pointer" onClick={() => navigate(`/doctors/${doctor.id}`)}>
      <div className="flex items-start space-x-4">
        <Avatar
          src={doctor.photo}
          alt={doctor.name}
          size="lg"
          fallback={doctor.name?.charAt(0)?.toUpperCase()}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {doctor.name}
            </h3>
            <div className="flex space-x-2">
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(doctor)
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
                    onDelete(doctor)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm font-medium text-teal-600">
              {doctor.specialization}
            </p>
            <p className="text-sm text-gray-600">
              {doctor.clinicName}
            </p>
          </div>
          
          <div className="mt-3 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              {doctor.phone}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              {doctor.email}
            </div>
          </div>
          
          {doctor.bio && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {doctor.bio}
              </p>
            </div>
          )}
          
          <div className="mt-3 text-xs text-gray-500">
            Joined: {formatDate(doctor.createdAt)}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DoctorCard
