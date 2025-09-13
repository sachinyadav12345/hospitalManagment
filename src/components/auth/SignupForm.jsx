import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { signup, clearError } from '../../store/slices/authSlice'

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)
  
  const [showPassword, setShowPassword] = useState(false)
  
  const roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'staff', label: 'Staff Member' }
  ]

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    role: Yup.string()
      .oneOf(['admin', 'doctor', 'staff'], 'Please select a valid role')
      .required('Role is required'),
    clinicName: Yup.string()
      .min(2, 'Clinic name must be at least 2 characters')
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { confirmPassword, ...signupData } = values
      await dispatch(signup(signupData)).unwrap()
      navigate('/dashboard')
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-teal-100">
            <UserPlus className="h-6 w-6 text-teal-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the Dental Clinic Management System
          </p>
        </div>
        
        <Formik
          initialValues={{ 
            name: '', 
            email: '', 
            password: '', 
            confirmPassword: '', 
            role: '', 
            clinicName: '' 
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="text-sm text-red-600">{error}</div>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="input-field mt-1"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="input-field mt-1"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <Field
                    as="select"
                    id="role"
                    name="role"
                    className="input-field mt-1"
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                  {/* TODO: In production, role assignment should be server-side controlled */}
                  <p className="text-xs text-gray-500 mt-1">
                    Note: Role selection is for demo purposes only
                  </p>
                </div>

                <div>
                  <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700">
                    Clinic Name (Optional)
                  </label>
                  <Field
                    id="clinicName"
                    name="clinicName"
                    type="text"
                    className="input-field mt-1"
                    placeholder="Enter clinic name"
                  />
                  <ErrorMessage name="clinicName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="input-field pr-10"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="input-field mt-1"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="btn-primary w-full flex justify-center items-center"
                >
                  {isSubmitting || isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <UserPlus className="h-5 w-5 mr-2" />
                  )}
                  Create Account
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-medium text-teal-600 hover:text-teal-500"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignupForm
