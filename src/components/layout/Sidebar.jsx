import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Settings,
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react'
import { setSidebarOpen } from '../../store/slices/uiSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const { sidebarOpen } = useSelector((state) => state.ui)

  const navigation = [
    {
      name: 'Dashboard',
      // href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'doctor', 'staff']
    },
    {
      name: 'Patients',
      href: '/patients',
      icon: Users,
      roles: ['admin', 'doctor', 'staff']
    },
    {
      name: 'Doctors',
      href: '/doctors',
      icon: UserCheck,
      roles: ['admin', 'doctor', 'staff']
    },
    // {
    //   name: 'Appointments',
    //   href: '/appointments',
    //   icon: Calendar,
    //   roles: ['admin', 'doctor', 'staff']
    // },
    // {
    //   name: 'Reports',
    //   href: '/reports',
    //   icon: BarChart3,
    //   roles: ['admin', 'doctor']
    // },
    // {
    //   name: 'Settings',
    //   href: '/settings',
    //   icon: Settings,
    //   roles: ['admin', 'doctor', 'staff']
    // }
  ]

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  )

  const isActive = (href) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
      

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    sidebar-item
                    ${active ? 'sidebar-item-active' : 'sidebar-item-inactive'}
                  `}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      dispatch(setSidebarOpen(false))
                    }
                  }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>

          {/* User info */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-medium text-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
