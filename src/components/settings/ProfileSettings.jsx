import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { User, Save } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Card from '../ui/Card'

const ProfileSettings = () => {
  const { user } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    clinicName: Yup.string()
      .min(2, 'Clinic name must be at least 2 characters')
      .required('Clinic name is required')
  })

  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      // TODO: Implement profile update API call
      console.log('Profile update:', values)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Profile update failed:', error)
      alert('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">
          Update your personal information and preferences
        </p>
      </div>

      <Card>
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600 capitalize">{user?.role}</p>
          </div>
        </div>

        <Formik
          initialValues={{
            name: user?.name || '',
            email: user?.email || '',
            clinicName: user?.clinicName || ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />

                <Input
                  label="Clinic Name"
                  name="clinicName"
                  type="text"
                  placeholder="Enter clinic name"
                />
              </div>

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
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>

      {/* Additional Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProfileSettings
