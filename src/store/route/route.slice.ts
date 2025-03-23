import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Route, RouteData } from '~/@types'
import { axiosClient } from '~/apis/axiosClient'

export type RouteState = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  routeData: RouteData | null
  routes: Route[]
}

const initialState: RouteState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  routeData: null,
  routes: []
}

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(passRoute.pending, (state) => {
        state.isLoading = true
      })
      .addCase(passRoute.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(passRoute.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(finishRoute.pending, (state) => {
        state.isLoading = true
      })
      .addCase(finishRoute.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(finishRoute.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getUserRoutes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserRoutes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.routeData = action.payload.data
        state.routes = action.payload.data.routes
      })
      .addCase(getUserRoutes.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

// export const {} = routesSlice.actions
const routeReducer = routeSlice.reducer
export default routeReducer

export const passRoute = createAsyncThunk(
  'route/pass-route',
  async (code: string, { rejectWithValue }) => {
    try {
      const res: ApiResponse<any> = await axiosClient.post('/Route/PassRoute', { code })
      console.log('passRoute res ===> ', res)
      return res
    } catch (error) {
      console.log('passRoute error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const finishRoute = createAsyncThunk(
  'route/finish-route',
  async (_, { rejectWithValue }) => {
    try {
      const res: ApiResponse<any> = await axiosClient.post(`/Route/FinishRoute`)
      console.log('finishRoute res ===> ', res)
      return res
    } catch (error) {
      console.log('finishRoute error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const getUserRoutes = createAsyncThunk(
  'route/get-user-routes',
  async (_, { rejectWithValue }) => {
    try {
      const res: ApiResponse<RouteData> = await axiosClient.get(`/Route/GetUserRoutes`)
      console.log('getUserRoutes res ===> ', res)
      return res
    } catch (error) {
      console.log('getUserRoutes error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)
