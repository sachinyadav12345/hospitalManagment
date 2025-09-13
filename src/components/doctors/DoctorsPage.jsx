import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createDoctor, updateDoctor, deleteDoctor, fetchDoctor } from '../../store/slices/doctorsSlice'
import { addToast } from '../../store/slices/uiSlice'
import DoctorList from './DoctorList'
import DoctorForm from './DoctorForm'
import DoctorDetail from './DoctorDetail'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

const DoctorsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentDoctor, isLoading } = useSelector((state) => state.doctors)
  
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [deletingDoctor, setDeletingDoctor] = useState(null)

  const handleCreateDoctor = async (values) => {
    try {
      await dispatch(createDoctor(values)).unwrap()
      setShowFormModal(false)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Doctor created successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to create doctor'
      }))
    }
  }

  const handleEditDoctor = async (values) => {
    try {
      await dispatch(updateDoctor({
        id: editingDoctor.id,
        doctorData: values
      })).unwrap()
      setShowFormModal(false)
      setEditingDoctor(null)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Doctor updated successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to update doctor'
      }))
    }
  }

  const handleDeleteDoctor = async () => {
    try {
      await dispatch(deleteDoctor(deletingDoctor.id)).unwrap()
      setShowDeleteModal(false)
      setDeletingDoctor(null)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Doctor deleted successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to delete doctor'
      }))
    }
  }

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor)
    setShowFormModal(true)
  }

  const handleDelete = (doctor) => {
    setDeletingDoctor(doctor)
    setShowDeleteModal(true)
  }

  const handleViewDoctor = async (doctorId) => {
    try {
      await dispatch(fetchDoctor(doctorId)).unwrap()
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to load doctor details'
      }))
    }
  }

  const closeModals = () => {
    setShowFormModal(false)
    setShowDeleteModal(false)
    setEditingDoctor(null)
    setDeletingDoctor(null)
  }

  return (
    <div className="space-y-6">
      <DoctorList
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Doctor Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={closeModals}
        title={editingDoctor ? 'Edit Doctor' : 'Create New Doctor'}
        size="xl"
      >
        <DoctorForm
          initialValues={editingDoctor}
          onSubmit={editingDoctor ? handleEditDoctor : handleCreateDoctor}
          isLoading={isLoading}
          isEdit={!!editingDoctor}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Doctor"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deletingDoctor?.name}</strong>? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteDoctor}
              loading={isLoading}
            >
              Delete Doctor
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DoctorsPage
