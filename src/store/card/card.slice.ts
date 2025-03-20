import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Card } from '~/@types'
import { axiosClient } from '~/apis/axiosClient'

export type CardState = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  userCards: Card[]
  cards: Card[]
}

const initialState: CardState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userCards: [],
  cards: []
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserCards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserCards.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.cards = action.payload.data
      })
      .addCase(getUserCards.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(useCard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(useCard.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(useCard.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(claimCards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(claimCards.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(claimCards.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

// export const {} = cardsSlice.actions
const cardReducer = cardSlice.reducer
export default cardReducer

export const getCards = createAsyncThunk('card/get-cards', async (_, { rejectWithValue }) => {
  try {
    const res: ApiResponse<Card[]> = await axiosClient.get('/Card/GetCards')
    console.log('getUserCards res ===> ', res)
    return res
  } catch (error) {
    console.log('getUserCards error ===>  ' + error)
    return rejectWithValue(error)
  }
})

export const getUserCards = createAsyncThunk(
  'card/get-user-cards',
  async (_, { rejectWithValue }) => {
    try {
      const res: ApiResponse<Card[]> = await axiosClient.get('/Card/GetUserCards')
      console.log('getUserCards res ===> ', res)
      return res
    } catch (error) {
      console.log('getUserCards error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const useCard = createAsyncThunk('card/user-card', async (cardId, { rejectWithValue }) => {
  try {
    const res: ApiResponse<any> = await axiosClient.put(`/Card/UseCard/${cardId}`)
    console.log('useCard res ===> ', res)
    return res
  } catch (error) {
    console.log('useCard error ===>  ' + error)
    return rejectWithValue(error)
  }
})

export const claimCards = createAsyncThunk('card/claim-cards', async (_, { rejectWithValue }) => {
  try {
    const res: ApiResponse<any> = await axiosClient.post(`/Card/ClaimCards`)
    console.log('claimCards res ===> ', res)
    return res
  } catch (error) {
    console.log('claimCards error ===>  ' + error)
    return rejectWithValue(error)
  }
})
