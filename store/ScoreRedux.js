import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiScoreCalls } from '../utility/site-apis'
import Config from "../common/Config";

const initialState = {
  isFetching: false,
  error: null,
  series: [],
  fixtures: [],
  scorecard: {},
}

export const getSeries = createAsyncThunk(
  'score/getSeries',
  async (params, { rejectWithValue }) => {
    const response = await apiScoreCalls('series')
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    return response.results
  }
)
export const getFixtures = createAsyncThunk(
  'score/getFixtures',
  async (params, { rejectWithValue }) => {
    let date = new Date()
    let queryDate = `${date.getFullYear()}-${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`
    const response = await apiScoreCalls(`fixtures-by-date/${queryDate}`)
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    return response.results
  }
)
export const getScorecard = createAsyncThunk(
  'score/getScorecard',
  async (params, { rejectWithValue }) => {
    const response = await apiScoreCalls('match/2432999')
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    return response.results
  }
)


export const counterSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    resetNews: (state, action) => {
      state.newsDetails = {}
    },
  },
  extraReducers: {
    // Series
    [getSeries.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
    },
    [getSeries.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload.message
    },
    [getSeries.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.series = action.payload
    },
    // Fixtures
    [getFixtures.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
    },
    [getFixtures.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload.message
    },
    [getFixtures.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.fixtures = action.payload
    },
    // Home Settings
    [getScorecard.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
    },
    [getScorecard.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload.message
    },
    [getScorecard.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.scorecard = action.payload
    },
  }

})

export const { resetNews } = counterSlice.actions
export default counterSlice.reducer