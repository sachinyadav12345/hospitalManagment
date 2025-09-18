import { useSelector } from 'react-redux'
import { Phone, Mail, Calendar, Clock, User, FileText, MapPin } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const AppointmentDetail = ({ appointment, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth)

  if (!appointment) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const canEdit = user?.role === 'admin' || 
                 (user?.role === 'doctor' && appointment.doctorId === user.id) ||
                 (user?.role === 'patient' && appointment.patientId === user.id)

  const canDelete = user?.role === 'admin' || 
                   (user?.role === 'doctor' && appointment.doctorId === user.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-teal-600" />
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            Appointment Details
          </h1>
          <div className="mt-2 flex items-center space-x-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status || 'Scheduled'}
            </span>
            <p className="text-gray-600">
              Created: {formatDate(appointment.createdAt)}
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4">
            {canEdit && (
              <Button onClick={() => onEdit(appointment)}>
                Edit Appointment
              </Button>
            )}
            {canDelete && (
              <Button
                variant="danger"
                onClick={() => onDelete(appointment)}
              >
                Cancel Appointment
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-gray-900">{formatDate(appointment.appointmentDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-gray-900">{formatTime(appointment.appointmentDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="text-gray-900">{appointment.patientName || 'Patient'}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Doctor Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="text-gray-900">Dr. {appointment.doctorName || 'Doctor'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="text-gray-900">{appointment.specialization || 'General'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{appointment.doctorPhone || 'N/A'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Reason and Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointment.reason && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reason for Visit</h3>
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <p className="text-gray-900">{appointment.reason}</p>
            </div>
          </Card>
        )}

        {appointment.notes && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <p className="text-gray-900 whitespace-pre-wrap">{appointment.notes}</p>
            </div>
          </Card>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Appointments
        </Button>
      </div>
    </div>
  )
}

export default AppointmentDetail
