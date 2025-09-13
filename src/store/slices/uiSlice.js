import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: true,
  modals: {
    patientDetail: false,
    patientForm: false,
    doctorDetail: false,
    doctorForm: false,
    confirmDelete: false,
  },
  toasts: [],
  loading: {
    global: false,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false
      })
    },
    addToast: (state, action) => {
      const toast = {
        id: Date.now().toString(),
        ...action.payload,
      }
      state.toasts.push(toast)
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
    },
    clearToasts: (state) => {
      state.toasts = []
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  closeAllModals,
  addToast,
  removeToast,
  clearToasts,
  setGlobalLoading,
} = uiSlice.actions

export default uiSlice.reducer
