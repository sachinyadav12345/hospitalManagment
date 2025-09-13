import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { login, clearError } from '../../store/slices/authSlice'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading, error } = useSelector((state) => state.auth)
  
  const [showPassword, setShowPassword] = useState(false)
  
  const from = location.state?.from?.pathname || '/dashboard'

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values)).unwrap()
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-teal-100">
            <LogIn className="h-6 w-6 text-teal-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Dental Clinic Management System
          </p>
        </div>
        
        <Formik
          initialValues={{ email: '', password: '' }}
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="input-field pr-10"
                      placeholder="Enter your password"
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
                    <LogIn className="h-5 w-5 mr-2" />
                  )}
                  Sign in
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="font-medium text-teal-600 hover:text-teal-500"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
                <div className="text-xs text-blue-700 space-y-1">
                  <div><strong>Admin:</strong> admin@clinic.com / password123</div>
                  <div><strong>Doctor:</strong> sarah.johnson@clinic.com / password123</div>
                  <div><strong>Staff:</strong> staff@clinic.com / password123</div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LoginForm
