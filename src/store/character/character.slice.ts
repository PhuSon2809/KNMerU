import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Character, SelectCharacterInput } from '~/@types'
import { axiosClient } from '~/apis/axiosClient'

export type CharacterState = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  characters: Character[]
}

const initialState: CharacterState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  characters: []
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.characters = action.payload.data
      })
      .addCase(getCharacters.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(selectCharacter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(selectCharacter.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(selectCharacter.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

// export const {} = charactersSlice.actions
const characterReducer = characterSlice.reducer
export default characterReducer

export const getCharacters = createAsyncThunk(
  'character/characters',
  async (_, { rejectWithValue }) => {
    try {
      const res: ApiResponse<Character[]> = await axiosClient.get('/Character/Characters')
      console.log('getCharacters res ===> ', res)
      return res
    } catch (error) {
      console.log('getCharacters error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const selectCharacter = createAsyncThunk(
  'character/select-character',
  async (params: SelectCharacterInput, { rejectWithValue }) => {
    try {
      const res: ApiResponse<Character[]> = await axiosClient.post(
        '/Character/SelectCharacter',
        params
      )
      console.log('selectCharacter res ===> ', res)
      return res
    } catch (error) {
      console.log('selectCharacter error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)
