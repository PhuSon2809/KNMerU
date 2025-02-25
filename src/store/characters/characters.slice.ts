import { createSlice } from '@reduxjs/toolkit'
import { Characters } from '~/@types'

export type CharactersState = {
  characterses: Characters[]
}
const initialState: CharactersState = {
  characterses: []
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {}
})

// export const {} = charactersSlice.actions
const charactersReducer = charactersSlice.reducer
export default charactersReducer
