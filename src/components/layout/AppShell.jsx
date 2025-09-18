import Header from './Header'
import Sidebar from './Sidebar'
import ToastContainer from '../ui/ToastContainer'

const AppShell = ({ children }) => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 lg:ml-0 overflow-auto">
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
