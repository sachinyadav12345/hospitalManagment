import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth)

  const signOut = () => {
    dispatch(logout())
  }

  const isAdmin = user?.role === 'admin'
  const isDoctor = user?.role === 'doctor'
  const isStaff = user?.role === 'staff'

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signOut,
    isAdmin,
    isDoctor,
    isStaff
  }
}
