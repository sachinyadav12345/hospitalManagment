import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { User, Bell, Shield, Palette } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'

const SettingsPage = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const settingsSections = [
    {
      title: 'Profile Settings',
      description: 'Manage your personal information and preferences',
      icon: User,
      href: '/settings/profile'
    },
    {
      title: 'Notifications',
      description: 'Configure notification preferences',
      icon: Bell,
      href: '/settings/notifications'
    },
    {
      title: 'Security',
      description: 'Manage password and security settings',
      icon: Shield,
      href: '/settings/security'
    },
    {
      title: 'Appearance',
      description: 'Customize theme and display options',
      icon: Palette,
      href: '/settings/appearance'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title} hover>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-teal-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {section.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => navigate(section.href)}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* User Info Card */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-900 font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900 font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-gray-900 font-medium capitalize">{user?.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Clinic</p>
            <p className="text-gray-900 font-medium">{user?.clinicName}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
