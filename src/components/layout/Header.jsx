import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Menu, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  ChevronDown 
} from 'lucide-react'
import { logout } from '../../store/slices/authSlice'
import { toggleSidebar } from '../../store/slices/uiSlice'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { sidebarOpen } = useSelector((state) => state.ui)
  
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
              Dental Clinic
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <Bell className="h-6 w-6" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                size="sm"
                fallback={getUserInitials(user?.name || 'U')}
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  {/* <button
                    onClick={() => {
                      navigate('/settings/profile')
                      setShowUserMenu(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile Settings
                  </button> */}
                  {/* <button
                    onClick={() => {
                      navigate('/settings')
                      setShowUserMenu(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </button> */}
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  )
}

export default Header
