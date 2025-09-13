import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromStorage } from './store/slices/authSlice'
import PrivateRoute from './components/auth/PrivateRoute'
import AppShell from './components/layout/AppShell'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import DashboardHome from './components/dashboard/DashboardHome'
import PatientsPage from './components/patients/PatientsPage'
import DoctorsPage from './components/doctors/DoctorsPage'
import DoctorDetail from './components/doctors/DoctorDetail'
import PatientForm from './components/patients/PatientForm'
import DoctorForm from './components/doctors/DoctorForm'
import SettingsPage from './components/settings/SettingsPage'
import ProfileSettings from './components/settings/ProfileSettings'
import NotFound from './components/common/NotFound'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
        } 
      />
      <Route 
        path="/signup" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupForm />
        } 
      />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AppShell>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardHome />} />
                
                {/* Patients Routes */}
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patients/new" element={<PatientForm />} />
                <Route path="/patients/:id/edit" element={<PatientForm />} />
                
                {/* Doctors Routes */}
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/new" element={<DoctorForm />} />
                <Route path="/doctors/:id" element={<DoctorDetail />} />
                <Route path="/doctors/:id/edit" element={<DoctorForm />} />
                
                {/* Settings Routes */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/profile" element={<ProfileSettings />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppShell>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
