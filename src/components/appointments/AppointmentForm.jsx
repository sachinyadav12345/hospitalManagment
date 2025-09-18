import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { fetchDoctors } from '../../store/slices/doctorsSlice'
import { fetchPatients } from '../../store/slices/patientsSlice'
import Button from '../ui/Button'
import { createAppointment } from '../../store/slices/appointmentsSlice'

const AppointmentForm = ({ 
  initialValues = {}, 
  onSubmit, 
  isLoading = false,
  isEdit = false 
}) => {
  const dispatch = useDispatch()
  const { doctors } = useSelector((state) => state.doctors)
  const { patients } = useSelector((state) => state.patients)
  const { user } = useSelector((state) => state.auth)
  const { isLoading: isCreatingAppointment, error: appointmentError } = useSelector((state) => state.appointments)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values)
    
    // Dispatch createAppointment action
    const result = await dispatch(createAppointment(values))
    console.log('Result:', result)
    
    if (createAppointment.fulfilled.match(result)) {
      console.log('Appointment created successfully:', result.payload)
      setShowSuccess(true)
      // Call the original onSubmit if provided (for navigation, etc.)
      if (onSubmit) {
        onSubmit(values)
      }
    } else if (createAppointment.rejected.match(result)) {
      console.error('Failed to create appointment:', result.payload)
      setShowSuccess(false)
    }
    
    setSubmitting(false)
  }

  useEffect(() => {
    dispatch(fetchDoctors())
    dispatch(fetchPatients())
  }, [dispatch])

  const validationSchema = Yup.object({
    patientId: Yup.string()
      .required('Please select a patient'),
    doctorId: Yup.string()
      .required('Please select a doctor'),
    appointmentDate: Yup.date()
      .min(new Date(), 'Appointment date cannot be in the past')
      .required('Appointment date is required'),
    appointmentTime: Yup.string()
      .required('Appointment time is required'),
    reason: Yup.string()
      .min(10, 'Reason must be at least 10 characters')
      .required('Reason is required'),
    status: Yup.string()
      .oneOf(['scheduled', 'confirmed', 'cancelled', 'completed'], 'Please select a valid status')
      .required('Status is required'),
    notes: Yup.string()
      .max(500, 'Notes must be less than 500 characters')
  })

  const defaultValues = {
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    status: 'scheduled',
    notes: '',
    ...initialValues
  }

  const doctorOptions = doctors.map(doctor => ({
    value: doctor.id,
    label: `${doctor.name} - ${doctor.specialization}`
  }))

  const patientOptions = patients.map(patient => ({
    value: patient.id,
    label: `${patient.name} - ${patient.email}`
  }))

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="space-y-6">
          {/* Success Display */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Appointment created successfully!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    The appointment has been scheduled.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {appointmentError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error creating appointment
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {appointmentError}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <Field
                  as="select"
                  name="patientId"
                  className="input-field"
                >
                  <option value="">Select a patient</option>
                  {patientOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="patientId" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <Field
                  as="select"
                  name="doctorId"
                  className="input-field"
                >
                  <option value="">Select a doctor</option>
                  {doctorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="doctorId" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Date
                </label>
                <Field
                  name="appointmentDate"
                  type="date"
                  className="input-field"
                />
                <ErrorMessage name="appointmentDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Time
                </label>
                <Field
                  as="select"
                  name="appointmentTime"
                  className="input-field"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="appointmentTime" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  className="input-field"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit
                </label>
                <Field
                  as="textarea"
                  name="reason"
                  rows={3}
                  className="input-field"
                  placeholder="Enter reason for the appointment"
                />
                <ErrorMessage name="reason" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  rows={3}
                  className="input-field"
                  placeholder="Enter any additional notes"
                />
                <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting || isLoading || isCreatingAppointment}
            >
              {isEdit ? 'Update Appointment' : 'Create Appointment'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AppointmentForm
