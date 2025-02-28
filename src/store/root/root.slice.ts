import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosClient } from '~/apis/axiosClient'

export interface RootDataState {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  generalInfo: GeneralInfor | null
}

const initialState: RootDataState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  generalInfo: null
}

const rootDataSlice = createSlice({
  name: 'rootData',
  initialState,
  reducers: {
    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getGeneralInfor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGeneralInfor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.generalInfo = action.payload.data
      })
      .addCase(getGeneralInfor.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

export const { setIsSuccess } = rootDataSlice.actions
const rootDataReducer = rootDataSlice.reducer

export default rootDataReducer

export const getGeneralInfor = createAsyncThunk<ApiResponse<GeneralInfor>>(
  'rootData/general-infor',
  async (_, { rejectWithValue }) => {
    try {
      const res: ApiResponse<GeneralInfor> = await axiosClient.get('/User/GetGeneralInformation')
      return res
    } catch (error) {
      console.log('GetGeneralInformation error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)
