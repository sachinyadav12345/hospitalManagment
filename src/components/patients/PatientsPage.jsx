import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPatient, updatePatient, deletePatient, fetchPatient } from '../../store/slices/patientsSlice'
import { addToast } from '../../store/slices/uiSlice'
import PatientList from './PatientList'
import PatientForm from './PatientForm'
import PatientDetailModal from './PatientDetailModal'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

const PatientsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentPatient, isLoading } = useSelector((state) => state.patients)
  
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const [deletingPatient, setDeletingPatient] = useState(null)

  const handleCreatePatient = async (values) => {
    try {
      await dispatch(createPatient(values)).unwrap()
      setShowFormModal(false)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Patient created successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to create patient'
      }))
    }
  }

  const handleEditPatient = async (values) => {
    try {
      await dispatch(updatePatient({
        id: editingPatient.id,
        patientData: values
      })).unwrap()
      setShowFormModal(false)
      setEditingPatient(null)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Patient updated successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to update patient'
      }))
    }
  }

  const handleDeletePatient = async () => {
    try {
      await dispatch(deletePatient(deletingPatient.id)).unwrap()
      setShowDeleteModal(false)
      setDeletingPatient(null)
      dispatch(addToast({
        type: 'success',
        title: 'Success',
        message: 'Patient deleted successfully'
      }))
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to delete patient'
      }))
    }
  }

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setShowFormModal(true)
  }

  const handleDelete = (patient) => {
    setDeletingPatient(patient)
    setShowDeleteModal(true)
  }

  const handleViewPatient = async (patientId) => {
    try {
      await dispatch(fetchPatient(patientId)).unwrap()
      setShowDetailModal(true)
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Error',
        message: error || 'Failed to load patient details'
      }))
    }
  }

  const closeModals = () => {
    setShowFormModal(false)
    setShowDetailModal(false)
    setShowDeleteModal(false)
    setEditingPatient(null)
    setDeletingPatient(null)
  }

  return (
    <div className="space-y-6">
      <PatientList
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Patient Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={closeModals}
        title={editingPatient ? 'Edit Patient' : 'Create New Patient'}
        size="xl"
      >
        <PatientForm
          initialValues={editingPatient}
          onSubmit={editingPatient ? handleEditPatient : handleCreatePatient}
          isLoading={isLoading}
          isEdit={!!editingPatient}
        />
      </Modal>

      {/* Patient Detail Modal */}
      <PatientDetailModal
        patient={currentPatient}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Patient"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deletingPatient?.name}</strong>? 
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
              onClick={handleDeletePatient}
              loading={isLoading}
            >
              Delete Patient
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PatientsPage
