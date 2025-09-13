import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPatients } from '../../store/slices/patientsSlice'
import { fetchDoctors } from '../../store/slices/doctorsSlice'
import KPICard from './KPICard'
import QuickActions from './QuickActions'
import RecentPatients from './RecentPatients'
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react'

const DashboardHome = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { patients, total: totalPatients } = useSelector((state) => state.patients)
  const { doctors, total: totalDoctors } = useSelector((state) => state.doctors)

  useEffect(() => {
    dispatch(fetchPatients({ limit: 5 }))
    dispatch(fetchDoctors({ limit: 10 }))
  }, [dispatch])

  const kpis = [
    {
      title: 'Total Patients',
      value: totalPatients,
      change: '+12%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Active Doctors',
      value: totalDoctors,
      change: '+2',
      changeType: 'positive',
      icon: UserCheck
    },
    {
      title: 'Appointments Today',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: Calendar
    },
    {
      title: 'Monthly Revenue',
      value: '$24,500',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-teal-100">
          Here's what's happening at {user?.clinicName || 'your clinic'} today.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              icon={Icon}
            />
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="xl:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Patients */}
        <div className="xl:col-span-2">
          <RecentPatients />
        </div>
      </div>

      {/* Additional info based on role */}
      {user?.role === 'doctor' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Your Patient Assignments
          </h3>
          <p className="text-blue-700">
            You are currently assigned to {patients.filter(p => p.assignedDoctorId === user.id).length} patients.
            Click on "Patients" in the sidebar to manage your patient list.
          </p>
        </div>
      )}

      {user?.role === 'staff' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Staff Dashboard
          </h3>
          <p className="text-green-700">
            You can create and update patient records, and manage appointments. 
            Contact an administrator for doctor management tasks.
          </p>
        </div>
      )}
    </div>
  )
}

export default DashboardHome
