import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createAppointment, updateAppointment, deleteAppointment, fetchAppointment } from '../../store/slices/appointmentsSlice'
import { addToast } from '../../store/slices/uiSlice'
import AppointmentList from './AppointmentList'
import AppointmentForm from './AppointmentForm'
import AppointmentDetail from './AppointmentDetail'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

const AppointmentsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentAppointment, isLoading } = useSelector((state) => state.appointments)
  
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [deletingAppointment, setDeletingAppointment] = useState(null)

  const handleCreateAppointment = async (values) => {
    try {
      await dispatch(createAppointment(values)).unwrap()
      setShowFormModal(false)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Appointment created successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to create appointment'
      }))
    }
  }

  const handleEditAppointment = async (values) => {
    try {
      await dispatch(updateAppointment({
        id: editingAppointment.id,
        appointmentData: values
      })).unwrap()
      setShowFormModal(false)
      setEditingAppointment(null)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Appointment updated successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to update appointment'
      }))
    }
  }

  const handleDeleteAppointment = async () => {
    try {
      await dispatch(deleteAppointment(deletingAppointment.id)).unwrap()
      setShowDeleteModal(false)
      setDeletingAppointment(null)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Appointment cancelled successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to cancel appointment'
      }))
    }
  }

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment)
    setShowFormModal(true)
  }

  const handleDelete = (appointment) => {
    setDeletingAppointment(appointment)
    setShowDeleteModal(true)
  }

  const handleViewAppointment = async (appointmentId) => {
    try {
      await dispatch(fetchAppointment(appointmentId)).unwrap()
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to load appointment details'
      }))
    }
  }

  const closeModals = () => {
    setShowFormModal(false)
    setShowDeleteModal(false)
    setEditingAppointment(null)
    setDeletingAppointment(null)
  }

  return (
    <div className="space-y-6">
      <AppointmentList
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Appointment Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={closeModals}
        title={editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
        size="xl"
      >
        <AppointmentForm
          initialValues={editingAppointment}
          onSubmit={editingAppointment ? handleEditAppointment : handleCreateAppointment}
          isLoading={isLoading}
          isEdit={!!editingAppointment}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Cancel Appointment"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to cancel the appointment for <strong>{deletingAppointment?.patientName}</strong>? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Keep Appointment
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteAppointment}
              loading={isLoading}
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AppointmentsPage
