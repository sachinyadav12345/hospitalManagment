import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
  createAppointmentApi, 
  getAllAppointmentApi, 
  getSingleAppointmentApi, 
  updateAppointmentApi, 
  deleteAppointmentApi 
} from '../../api/appointmentsApi'

// Async thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllAppointmentApi(params)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchAppointment = createAsyncThunk(
  'appointments/fetchAppointment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSingleAppointmentApi(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await createAppointmentApi(appointmentData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, appointmentData }, { rejectWithValue }) => {
    try {
      const response = await updateAppointmentApi(id, appointmentData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAppointmentApi(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  appointments: [],
  currentAppointment: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  error: null,
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null
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
      // Fetch appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = action.payload.data || action.payload
        state.total = action.payload.total || action.payload.length
        state.page = action.payload.page || 1
        state.limit = action.payload.limit || 10
        state.totalPages = action.payload.totalPages || 1
        state.error = null
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch single appointment
      .addCase(fetchAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentAppointment = action.payload
        state.error = null
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments.unshift(action.payload)
        state.total += 1
        state.error = null
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Update appointment
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.appointments.findIndex(a => a.id === action.payload.id)
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
        if (state.currentAppointment && state.currentAppointment.id === action.payload.id) {
          state.currentAppointment = action.payload
        }
        state.error = null
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Delete appointment
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = state.appointments.filter(a => a.id !== action.payload)
        state.total -= 1
        if (state.currentAppointment && state.currentAppointment.id === action.payload) {
          state.currentAppointment = null
        }
        state.error = null
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentAppointment, clearError, setPage } = appointmentsSlice.actions
export default appointmentsSlice.reducer
