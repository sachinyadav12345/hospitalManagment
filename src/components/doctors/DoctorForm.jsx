import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createDoctor } from '../../store/slices/doctorsSlice'
import Button from '../ui/Button'

const DoctorForm = ({ 
  initialValues = {}, 
  onSubmit, 
  isLoading = false,
  isEdit = false 
}) => {
  const dispatch = useDispatch()
  const { isLoading: isCreatingDoctor, error: doctorError } = useSelector((state) => state.doctors)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values)
    
    // Dispatch createDoctor action
    const result = await dispatch(createDoctor(values))
    console.log('Result:', result)
    
    if (createDoctor.fulfilled.match(result)) {
      console.log('Doctor created successfully:', result.payload)
      setShowSuccess(true)
      // Call the original onSubmit if provided (for navigation, etc.)
      if (onSubmit) {
        onSubmit(values)
      }
    } else if (createDoctor.rejected.match(result)) {
      console.error('Failed to create doctor:', result.payload)
      setShowSuccess(false)
    }
    
    setSubmitting(false)
  }
  
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
    specialization: Yup.string()
      .min(2, 'Specialization must be at least 2 characters')
      .required('Specialization is required'),
    clinicName: Yup.string()
      .min(2, 'Clinic name must be at least 2 characters')
      .required('Clinic name is required'),
    bio: Yup.string()
      .max(500, 'Bio must be less than 500 characters')
  })

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    specialization: '',
    clinicName: '',
    bio: '',
    photo: '',
    ...initialValues
  }

  const specializations = [
    'General Dentistry',
    'Orthodontics',
    'Oral Surgery',
    'Periodontics',
    'Pediatric Dentistry',
    'Endodontics',
    'Prosthodontics',
    'Oral Pathology',
    'Oral Medicine',
    'Public Health Dentistry'
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
                    Doctor created successfully!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    The doctor has been added to the system.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {doctorError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error creating doctor
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {doctorError}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="input-field"
                  placeholder="Enter doctor's full name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  className="input-field"
                  placeholder="Enter email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Field
                  name="phone"
                  type="tel"
                  className="input-field"
                  placeholder="Enter phone number"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <Field
                  as="select"
                  name="specialization"
                  className="input-field"
                >
                  <option value="">Select specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="specialization" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic Name
                </label>
                <Field
                  name="clinicName"
                  type="text"
                  className="input-field"
                  placeholder="Enter clinic name"
                />
                <ErrorMessage name="clinicName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <Field
                  as="textarea"
                  name="bio"
                  rows={4}
                  className="input-field"
                  placeholder="Enter doctor's bio and experience"
                />
                <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
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
                      alt="Doctor preview"
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
              loading={isSubmitting || isLoading || isCreatingDoctor}
            >
              {isEdit ? 'Update Doctor' : 'Create Doctor'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default DoctorForm
