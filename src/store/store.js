import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import patientsReducer from './slices/patientsSlice'
import doctorsReducer from './slices/doctorsSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    doctors: doctorsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
