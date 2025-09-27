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
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
      case 'confirmed':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300'
      case 'cancelled':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
      case 'completed':
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
    }
  }

  return (
    <Card hover className="cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-105" onClick={() => navigate(`/appointments/${appointment.id}`)}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
            <Calendar className="h-7 w-7 text-teal-600" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-teal-700 transition-colors duration-200">
              {appointment.patientName || 'Patient'}
            </h3>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(appointment)
                  }}
                  className="p-2 rounded-xl border-gray-300 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
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
                  className="p-2 rounded-xl border-gray-300 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-base font-semibold text-teal-600 group-hover:text-teal-700 transition-colors duration-200">
              Dr. {appointment.doctorName || 'Doctor'}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {appointment.specialization || 'Specialization'}
            </p>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 mr-3 text-teal-500" />
              <span className="font-medium">{formatDate(appointment.appointmentDate)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <Clock className="h-4 w-4 mr-3 text-teal-500" />
              <span className="font-medium">{formatTime(appointment.appointmentDate)}</span>
            </div>
          </div>
          
          {appointment.reason && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 rounded-lg p-3">
                <span className="font-medium text-gray-700">Reason:</span> {appointment.reason}
              </p>
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${getStatusColor(appointment.status)}`}>
              {appointment.status || 'Scheduled'}
            </span>
            <div className="text-xs text-gray-500 font-medium">
              Created: {formatDate(appointment.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AppointmentCard
