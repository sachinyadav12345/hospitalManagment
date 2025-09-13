import { useSelector, useDispatch } from 'react-redux'
import Toast from './Toast'
import { removeToast } from '../../store/slices/uiSlice'

const ToastContainer = () => {
  const dispatch = useDispatch()
  const toasts = useSelector((state) => state.ui.toasts)

  const handleClose = (id) => {
    dispatch(removeToast(id))
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={handleClose}
        />
      ))}
    </div>
  )
}

export default ToastContainer
