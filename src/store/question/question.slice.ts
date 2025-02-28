import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnswerInput, Question } from '~/@types'
import { axiosClient } from '~/apis/axiosClient'

export type QuestionState = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  questions: Question[]
}

const initialState: QuestionState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  questions: []
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.questions = action.payload.data
      })
      .addCase(getQuestion.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.questions = action.payload.data
      })
      .addCase(getQuestions.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(answerQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(answerQuestion.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(answerQuestion.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  }
})

// export const {} = questionsSlice.actions
const questionReducer = questionSlice.reducer
export default questionReducer

export const getQuestion = createAsyncThunk(
  'question/question',
  async (type: number, { rejectWithValue }) => {
    try {
      const res: ApiResponse<Question[]> = await axiosClient.post('/Question/GetQuestion', { type })
      console.log('getQuestion res ===> ', res)
      return res
    } catch (error) {
      console.log('getQuestion error ===>  ', error)
      return rejectWithValue(error)
    }
  }
)

export const answerQuestion = createAsyncThunk(
  'question/answer-question',
  async (params: AnswerInput, { rejectWithValue }) => {
    try {
      const res: ApiResponse<any> = await axiosClient.post('/Question/AnswerQuestion', params)
      console.log('AnswerQuestion res ===> ', res)
      return res
    } catch (error) {
      console.log('AnswerQuestion error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)

export const getQuestions = createAsyncThunk(
  'question/questions',
  async (_: any, { rejectWithValue }) => {
    try {
      const res: ApiResponse<Question[]> = await axiosClient.get('/Question/GetQuestions')
      console.log('getQuestions res ===> ', res)
      return res
    } catch (error) {
      console.log('getQuestions error ===>  ' + error)
      return rejectWithValue(error)
    }
  }
)
