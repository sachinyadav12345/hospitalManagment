import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from '../../api/mockApi'

// Async thunks
export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (params, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const response = await mockApi.patients.getPatients(params)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchPatient = createAsyncThunk(
  'patients/fetchPatient',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const response = await mockApi.patients.getPatient(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (patientData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const response = await mockApi.patients.createPatient(patientData, auth.user)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async ({ id, patientData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const response = await mockApi.patients.updatePatient(id, patientData, auth.user)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      await mockApi.patients.deletePatient(id, auth.user)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  patients: [],
  currentPatient: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  error: null,
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearCurrentPatient: (state) => {
      state.currentPatient = null
    },
    clearError: (state) => {
      state.error = null
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch patients
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false
        state.patients = action.payload.data
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.totalPages = action.payload.totalPages
        state.error = null
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch single patient
      .addCase(fetchPatient.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPatient = action.payload
        state.error = null
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Create patient
      .addCase(createPatient.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.isLoading = false
        state.patients.unshift(action.payload)
        state.total += 1
        state.error = null
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Update patient
      .addCase(updatePatient.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.patients.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.patients[index] = action.payload
        }
        if (state.currentPatient && state.currentPatient.id === action.payload.id) {
          state.currentPatient = action.payload
        }
        state.error = null
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Delete patient
      .addCase(deletePatient.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.isLoading = false
        state.patients = state.patients.filter(p => p.id !== action.payload)
        state.total -= 1
        if (state.currentPatient && state.currentPatient.id === action.payload) {
          state.currentPatient = null
        }
        state.error = null
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentPatient, clearError, setPage } = patientsSlice.actions
export default patientsSlice.reducer
