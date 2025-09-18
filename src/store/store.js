import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import patientsReducer from './slices/patientsSlice'
import doctorsReducer from './slices/doctorsSlice'
import appointmentsReducer from './slices/appointmentsSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
