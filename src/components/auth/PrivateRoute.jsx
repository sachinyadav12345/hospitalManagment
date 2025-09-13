import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute
