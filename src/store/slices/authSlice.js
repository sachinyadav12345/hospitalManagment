import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from '../../api/mockApi'

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await mockApi.auth.signup(userData)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await mockApi.auth.login(credentials)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
)

export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      return {
        token,
        user: JSON.parse(user)
      }
    }
    
    throw new Error('No stored user found')
  }
)

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      
      // Load user from storage
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
