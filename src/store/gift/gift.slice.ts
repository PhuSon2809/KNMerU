import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Gift } from '~/@types'
import { axiosClient } from '~/apis/axiosClient'

export type GiftState = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  randomGifts: Gift | null
  userGifts: Gift[]
  gifts: Gift[]
}

const initialState: GiftState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  randomGifts: null,
  userGifts: [],
  gifts: []
}

export const giftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRandomGift.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRandomGift.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.randomGifts = action.payload.data
      })
      .addCase(getRandomGift.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getUserGifts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserGifts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.userGifts = action.payload.data
      })
      .addCase(getUserGifts.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getGifts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGifts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.gifts = action.payload.data
      })
      .addCase(getGifts.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

// export const {} = giftsSlice.actions
const giftReducer = giftSlice.reducer
export default giftReducer

export const getRandomGift = createAsyncThunk(
  'gift/get-random-gift',
  async (classLevel: number, { rejectWithValue }) => {
    try {
      const res: ApiResponse<any> = await axiosClient.post('/Gift/GetRandomGift', { classLevel })
      console.log('getRandomGift res ===> ', res)
      return res
    } catch (error) {
      console.log('getRandomGift error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const getUserGifts = createAsyncThunk(
  'gift/get-user-gifts',
  async (_, { rejectWithValue }) => {
    try {
      const res: ApiResponse<any> = await axiosClient.get('/Gift/GetUserGifts')
      console.log('getUserGifts res ===> ', res)
      return res
    } catch (error) {
      console.log('getUserGifts error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const getGifts = createAsyncThunk('gift/get-gifts', async (_, { rejectWithValue }) => {
  try {
    const res: ApiResponse<any> = await axiosClient.get('/Gift/GetGifts')
    console.log('getGifts res ===> ', res)
    return res
  } catch (error) {
    console.log('getGifts error ===>  ' + error)
    return rejectWithValue(error)
  }
})
