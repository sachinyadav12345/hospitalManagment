import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
  getAllDoctorsApi, 
  createDoctorApi, 
  getSingleDoctorApi, 
  updateDoctorApi, 
  deleteDoctorApi 
} from '../../api/doctorsApi'

// Async thunks
export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllDoctorsApi()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchDoctor = createAsyncThunk(
  'doctors/fetchDoctor',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSingleDoctorApi(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createDoctor = createAsyncThunk(
  'doctors/createDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await createDoctorApi(doctorData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateDoctor = createAsyncThunk(
  'doctors/updateDoctor',
  async ({ id, doctorData }, { rejectWithValue }) => {
    try {
      const response = await updateDoctorApi(id, doctorData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteDoctor = createAsyncThunk(
  'doctors/deleteDoctor',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoctorApi(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  doctors: [],
  currentDoctor: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  error: null,
}

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearCurrentDoctor: (state) => {
      state.currentDoctor = null
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
      // Fetch doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false
        state.doctors = action.payload.data
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.totalPages = action.payload.totalPages
        state.error = null
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch single doctor
      .addCase(fetchDoctor.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentDoctor = action.payload
        state.error = null
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Create doctor
      .addCase(createDoctor.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.isLoading = false
        state.doctors.unshift(action.payload)
        state.total += 1
        state.error = null
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Update doctor
      .addCase(updateDoctor.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.doctors.findIndex(d => d.id === action.payload.id)
        if (index !== -1) {
          state.doctors[index] = action.payload
        }
        if (state.currentDoctor && state.currentDoctor.id === action.payload.id) {
          state.currentDoctor = action.payload
        }
        state.error = null
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Delete doctor
      .addCase(deleteDoctor.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isLoading = false
        state.doctors = state.doctors.filter(d => d.id !== action.payload)
        state.total -= 1
        if (state.currentDoctor && state.currentDoctor.id === action.payload) {
          state.currentDoctor = null
        }
        state.error = null
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentDoctor, clearError, setPage } = doctorsSlice.actions
export default doctorsSlice.reducer
