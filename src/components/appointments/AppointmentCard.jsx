import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Edit, Trash2, Phone, Mail, Calendar, Clock, User } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const canEdit = user?.role === 'admin' || 
                 (user?.role === 'doctor' && appointment.doctorId === user.id) ||
                 (user?.role === 'patient' && appointment.patientId === user.id)

  const canDelete = user?.role === 'admin' || 
                   (user?.role === 'doctor' && appointment.doctorId === user.id)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card hover className="cursor-pointer" onClick={() => navigate(`/appointments/${appointment.id}`)}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-teal-600" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {appointment.patientName || 'Patient'}
            </h3>
            <div className="flex space-x-2">
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(appointment)
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
                    onDelete(appointment)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm font-medium text-teal-600">
              Dr. {appointment.doctorName || 'Doctor'}
            </p>
            <p className="text-sm text-gray-600">
              {appointment.specialization || 'Specialization'}
            </p>
          </div>
          
          <div className="mt-3 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(appointment.appointmentDate)}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              {formatTime(appointment.appointmentDate)}
            </div>
          </div>
          
          {appointment.reason && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {appointment.reason}
              </p>
            </div>
          )}
          
          <div className="mt-3 flex items-center justify-between">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status || 'Scheduled'}
            </span>
            <div className="text-xs text-gray-500">
              Created: {formatDate(appointment.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AppointmentCard
