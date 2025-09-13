import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Plus, Users, UserCheck, Calendar, ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const QuickActions = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const actions = [
    {
      title: 'Add Patient',
      description: 'Register a new patient',
      icon: Users,
      onClick: () => navigate('/patients/new'),
      roles: ['admin', 'doctor', 'staff'],
      color: 'teal',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Add Doctor',
      description: 'Register a new doctor',
      icon: UserCheck,
      onClick: () => navigate('/doctors/new'),
      roles: ['admin'],
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: Calendar,
      onClick: () => navigate('/appointments/new'),
      roles: ['admin', 'doctor', 'staff'],
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'View Reports',
      description: 'Access analytics and reports',
      icon: Sparkles,
      onClick: () => navigate('/reports'),
      roles: ['admin', 'doctor'],
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600'
    }
  ]

  const filteredActions = actions.filter(action => 
    action.roles.includes(user?.role)
  )

  const getColorClasses = (color) => {
    const colorMap = {
      teal: {
        bg: 'bg-teal-50',
        hoverBg: 'hover:bg-teal-100',
        border: 'border-teal-200',
        hoverBorder: 'hover:border-teal-300',
        iconBg: 'bg-teal-100',
        iconHoverBg: 'group-hover:bg-teal-200',
        iconColor: 'text-teal-600',
        iconHoverColor: 'group-hover:text-teal-700',
        textColor: 'text-teal-700',
        gradient: 'from-teal-500 to-teal-600'
      },
      blue: {
        bg: 'bg-blue-50',
        hoverBg: 'hover:bg-blue-100',
        border: 'border-blue-200',
        hoverBorder: 'hover:border-blue-300',
        iconBg: 'bg-blue-100',
        iconHoverBg: 'group-hover:bg-blue-200',
        iconColor: 'text-blue-600',
        iconHoverColor: 'group-hover:text-blue-700',
        textColor: 'text-blue-700',
        gradient: 'from-blue-500 to-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        hoverBg: 'hover:bg-purple-100',
        border: 'border-purple-200',
        hoverBorder: 'hover:border-purple-300',
        iconBg: 'bg-purple-100',
        iconHoverBg: 'group-hover:bg-purple-200',
        iconColor: 'text-purple-600',
        iconHoverColor: 'group-hover:text-purple-700',
        textColor: 'text-purple-700',
        gradient: 'from-purple-500 to-purple-600'
      },
      emerald: {
        bg: 'bg-emerald-50',
        hoverBg: 'hover:bg-emerald-100',
        border: 'border-emerald-200',
        hoverBorder: 'hover:border-emerald-300',
        iconBg: 'bg-emerald-100',
        iconHoverBg: 'group-hover:bg-emerald-200',
        iconColor: 'text-emerald-600',
        iconHoverColor: 'group-hover:text-emerald-700',
        textColor: 'text-emerald-700',
        gradient: 'from-emerald-500 to-emerald-600'
      }
    }
    return colorMap[color] || colorMap.teal
  }

  return (
    <Card className="relative overflow-hidden">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-teal-500 to-teal-600 -m-6 mb-6 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Quick Actions</h3>
            <p className="text-teal-100 text-sm mt-1">Get things done faster</p>
          </div>
          <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Plus className="h-6 w-6" />
          </div>
        </div>
      </div>
      
      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {filteredActions.map((action) => {
          const Icon = action.icon
          const colors = getColorClasses(action.color)
          
          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className={`
                group relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ease-in-out
                ${colors.bg} ${colors.hoverBg} ${colors.border} ${colors.hoverBorder}
                hover:shadow-lg hover:scale-105 transform
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                active:scale-95
              `}
            >
              {/* Gradient overlay on hover */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 
                group-hover:opacity-10 transition-opacity duration-300 rounded-xl
              `} />
              
              <div className="relative">
                {/* Icon */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`
                    h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${colors.iconBg} ${colors.iconHoverBg}
                  `}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.iconColor} ${colors.iconHoverColor}`} />
                  </div>
                  <ArrowRight className={`
                    h-4 w-4 sm:h-5 sm:w-5 opacity-0 group-hover:opacity-100 transition-all duration-300
                    ${colors.iconColor} transform group-hover:translate-x-1
                  `} />
                </div>
                
                {/* Content */}
                <div className="text-left">
                  <h4 className={`font-semibold text-base sm:text-lg mb-1 sm:mb-2 ${colors.textColor}`}>
                    {action.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Click any action above to get started
        </p>
      </div>
    </Card>
  )
}

export default QuickActions
