import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { fetchDoctors } from '../../store/slices/doctorsSlice'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'

const PatientForm = ({ 
  initialValues = {}, 
  onSubmit, 
  isLoading = false,
  isEdit = false 
}) => {
  const dispatch = useDispatch()
  const { doctors } = useSelector((state) => state.doctors)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchDoctors())
  }, [dispatch])

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number')
      .required('Phone is required'),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .required('Date of birth is required'),
    gender: Yup.string()
      .oneOf(['male', 'female', 'other'], 'Please select a gender')
      .required('Gender is required'),
    address: Yup.string()
      .min(10, 'Address must be at least 10 characters')
      .required('Address is required'),
    assignedDoctorId: Yup.string()
      .required('Please assign a doctor'),
    notes: Yup.string()
      .max(500, 'Notes must be less than 500 characters')
  })

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    assignedDoctorId: '',
    notes: '',
    photo: '',
    ...initialValues
  }

  const doctorOptions = doctors.map(doctor => ({
    value: doctor.id,
    label: `${doctor.name} - ${doctor.specialization}`
  }))

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter patient's full name"
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter email address"
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
              />

              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
              />

              <Select
                label="Gender"
                name="gender"
                options={genderOptions}
                placeholder="Select gender"
              />
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Field
                  as="textarea"
                  name="address"
                  rows={3}
                  className="input-field"
                  placeholder="Enter full address"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <Select
                label="Assigned Doctor"
                name="assignedDoctorId"
                options={doctorOptions}
                placeholder="Select a doctor"
              />

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo URL (Optional)
                </label>
                <Field
                  name="photo"
                  type="url"
                  className="input-field"
                  placeholder="Enter photo URL"
                />
                <ErrorMessage name="photo" component="div" className="text-red-500 text-sm mt-1" />
                {values.photo && (
                  <div className="mt-2">
                    <img
                      src={values.photo}
                      alt="Patient preview"
                      className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
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
              loading={isSubmitting || isLoading}
            >
              {isEdit ? 'Update Patient' : 'Create Patient'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default PatientForm
