import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginInput, LoginRes, LoginSocialInput, RegisterInput, UserInfor } from '~/@types'
import { axiosClient } from '~/apis/axiosClient'
import { isSuccessRes, removeAccessToken, setAccessToken } from '~/utils'

export interface AuthState {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  isAuthenticated: boolean
  userInfo: UserInfor | null
  userLogin: LoginInput
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isAuthenticated: false,
  userInfo: null,
  userLogin: { email: '', password: '' }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setUserLogin: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.userLogin = action.payload
    },
    setUserInfor: (state, action: PayloadAction<UserInfor | null>) => {
      state.userInfo = action.payload
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
      .addCase(getUserInfor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.userInfo = action.payload.data
      })
      .addCase(getUserInfor.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

export const { setIsSuccess, setUserLogin, setAuthenticated, setUserInfor } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer

export const register = createAsyncThunk<ApiResponse<any[]>, RegisterInput>(
  'auth/register',
  async (params: RegisterInput, { dispatch, rejectWithValue }) => {
    try {
      const res: ApiResponse<any[]> = await axiosClient.post('/Authenticate/Register', params)
      dispatch(setUserLogin({ email: params.email, password: params.password }))
      return res
    } catch (error) {
      console.log('register error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<ApiResponse<LoginRes>, LoginInput>(
  'auth/login',
  async (params: LoginInput, { dispatch, rejectWithValue }) => {
    try {
      const res: ApiResponse<LoginRes> = await axiosClient.post('/Authenticate/Login', params)
      console.log('login res ===> ', res)
      if (isSuccessRes(res.status)) {
        setAccessToken(res.data.token)
        dispatch(setAuthenticated(true))
      }
      return res
    } catch (error) {
      console.log('login error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const loginSocial = createAsyncThunk(
  'auth/loginSocial',
  async (params: LoginSocialInput, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosClient.post('/Authenticate/LoginSocial', params)
      console.log('loginSocial res ===> ', res)
      if (isSuccessRes(res.status)) {
        setAccessToken(res.data.token)
        dispatch(setAuthenticated(true))
      }
      return res
    } catch (error) {
      console.log('loginSocial error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const getUserInfor = createAsyncThunk(
  'auth/getUserInfor',
  async (_, { rejectWithValue }) => {
    try {
      const res: ApiResponse<UserInfor> = await axiosClient.get('/User/GetInformation')
      console.log('getUserInfor res ===> ', res)
      return res
    } catch (error) {
      console.log('getUserInfor error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
  try {
    removeAccessToken()
    localStorage.clear()
    dispatch(setUserInfor(null))
    dispatch(setAuthenticated(false))
  } catch (error: any) {
    return rejectWithValue(error)
  }
})
