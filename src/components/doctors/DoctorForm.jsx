import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Input from '../ui/Input'
import Button from '../ui/Button'

const DoctorForm = ({ 
  initialValues = {}, 
  onSubmit, 
  isLoading = false,
  isEdit = false 
}) => {
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
    avatar: '',
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
                placeholder="Enter doctor's full name"
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
              
              <Input
                label="Clinic Name"
                name="clinicName"
                type="text"
                placeholder="Enter clinic name"
              />

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
                  Avatar URL (Optional)
                </label>
                <Field
                  name="avatar"
                  type="url"
                  className="input-field"
                  placeholder="Enter avatar URL"
                />
                <ErrorMessage name="avatar" component="div" className="text-red-500 text-sm mt-1" />
                {values.avatar && (
                  <div className="mt-2">
                    <img
                      src={values.avatar}
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
              loading={isSubmitting || isLoading}
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
