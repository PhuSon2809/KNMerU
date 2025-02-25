import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginInput, LoginSocialInput, RegisterInput, UserInfor } from '~/@types'
import { axiosClient } from '~/apis/axiosClient'

export interface AuthState {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  isAuthenticated: boolean
  isAttendanced: boolean
  userInfo: UserInfor | null
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isAttendanced: false,
  isAuthenticated: false,
  userInfo: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getUserInfor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserInfor.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(getUserInfor.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(checkIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkIn.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.isAttendanced = true
      })
      .addCase(checkIn.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

export const { setIsSuccess } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer

export const register = createAsyncThunk(
  'auth/register',
  async (params: RegisterInput, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post('/Authenticate/Register', params)
      console.log('register res ===> ', res)
      return res
    } catch (error) {
      console.log('register error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk(
  'auth/register',
  async (params: LoginInput, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post('/Authenticate/Login', params)
      console.log('login res ===> ', res)
      return res
    } catch (error) {
      console.log('login error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const loginSocial = createAsyncThunk(
  'auth/login',
  async (params: LoginSocialInput, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post('/Authenticate/LoginSocial', params)
      console.log('loginSocial res ===> ', res)
      return res
    } catch (error) {
      console.log('loginSocial error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const getUserInfor = createAsyncThunk(
  'auth/getUserInfor',
  async (_: any, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get('/User/GetInformation')
      console.log('getUserInfor res ===> ', res)
      return res
    } catch (error) {
      console.log('getUserInfor error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const checkIn = createAsyncThunk('attendance/checkIn', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosClient.post('/Attendance/CheckIn')
    console.log('checkIn res ===> ', res)
    return res
  } catch (error) {
    console.log('checkIn error ===>  ' + error)
    return rejectWithValue(error)
  }
})
