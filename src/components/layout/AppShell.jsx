import Header from './Header'
import Sidebar from './Sidebar'
import ToastContainer from '../ui/ToastContainer'

const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AppShell
