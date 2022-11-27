import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getScoreDataApi, getAllDataApi, getLiveDataDataApi } from '../utility/frappe-apis'

const initialState = {
  isFetching: false,
  error: null,
  homeslider: [],
  series: [],
  archivesSeries: [],
  matches: [],
  teams: [],
  matcheslistByDay: [],
  matcheslistByFilter: [],
  matcheslistBySerie: [],
  highlights: {},
}


export const getHomeSliders: any = createAsyncThunk(
  'score/getHomeSliders',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getHomeMatchList', query: params })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    for (let item of response) {
      item.venue = item.venue ? JSON.parse(item.venue) : {}
      item.score = item.score ? JSON.parse(item.score) : {}
    }
    return response
  }
)

export const getArchivesSeries: any = createAsyncThunk(
  'score/getArchivesSeries',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getSeriesArchivesList', query: params })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    for (let item of response) {
      if (item.startdt) {
        let date = new Date(item.startdt)
        let month = Number(date.getMonth()) + 1
        item.sortdate = `${date.getFullYear()}-${month < 10 ? "0" + month : month}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`
      }
    }
    return response
  }
)

export const getAllSeries: any = createAsyncThunk(
  'score/getAllSeries',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getSeriesList', query: params })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    for (let item of response) {
      if (item.startdt) {
        let date = new Date(item.startdt)
        let month = Number(date.getMonth()) + 1
        item.sortdate = `${date.getFullYear()}-${month < 10 ? "0" + month : month}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`
      }
    }
    return response
  }
)

export const getAllTeam: any = createAsyncThunk(
  'score/getAllTeam',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getTeamsList', query: null })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    return response
  }
)

export const getMatchesByDay: any = createAsyncThunk(
  'score/getMatchesByDay',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getMatchesByDay', query: params })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    for (let item of response) {
      item.venue = item.venue ? JSON.parse(item.venue) : {}
    }
    return response
  }
)

export const getMatchesByFilter: any = createAsyncThunk(
  'score/getMatchesByFilter',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getMatchesByFilter', query: params })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    for (let item of response) {
      item.venue = item.venue ? JSON.parse(item.venue) : {}
      item.score = item.score ? JSON.parse(item.score) : {}
    }
    return response
  }
)

export const getMatchesBySeries: any = createAsyncThunk(
  'score/getMatchesBySeries',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getMatchesBySeries', query: params })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    for (let item of response) {
      item.venue = item.venue ? JSON.parse(item.venue) : {}
      item.score = item.score ? JSON.parse(item.score) : {}
    }
    return response
  }
)

export const getHighlights: any = createAsyncThunk(
  'score/getHighlights',
  async (params, { rejectWithValue }) => {
    const response = await getScoreDataApi({ path: 'getHighlights', query: params })
    if (response.status === 'error') {
      return rejectWithValue(response.data)
    }
    // for (let item of response) {
    //   item.venue = item.venue ? JSON.parse(item.venue) : {}
    //   item.score = item.score ? JSON.parse(item.score) : {}
    // }
    return response
  }
)


export const counterSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    getScorecard: (state: any, action) => {
      state.scorecard = { ...state.scorecard, ...action.payload }
    },
  },
  extraReducers: {
    // series
    [getHomeSliders.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.homeslider = []
    },
    [getHomeSliders.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getHomeSliders.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.homeslider = action.payload
    },
    // series
    [getAllSeries.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.series = []
    },
    [getAllSeries.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getAllSeries.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.series = action.payload
    },
    // archives series
    [getArchivesSeries.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.archivesSeries = []
    },
    [getArchivesSeries.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getArchivesSeries.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.archivesSeries = action.payload
    },
    // teams
    [getAllTeam.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.teams = []
    },
    [getAllTeam.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getAllTeam.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.teams = action.payload
    },
    // Matches By Day
    [getMatchesByDay.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.matcheslistByDay = []
    },
    [getMatchesByDay.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getMatchesByDay.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.matcheslistByDay = action.payload
    },
    // Matches By Filter
    [getMatchesByFilter.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.matcheslistByFilter = []
    },
    [getMatchesByFilter.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getMatchesByFilter.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.matcheslistByFilter = action.payload
    },
    // Matches By Series
    [getMatchesBySeries.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.matcheslistBySerie = []
    },
    [getMatchesBySeries.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getMatchesBySeries.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.matcheslistBySerie = action.payload
    },
    // Matches By Series
    [getHighlights.pending]: (state, action) => {
      state.isFetching = true
      state.error = null
      state.highlights = {}
    },
    [getHighlights.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    [getHighlights.fulfilled]: (state, action) => {
      state.isFetching = false
      state.error = null
      state.highlights = action.payload
    },
  }

})

export const { getScorecard } = counterSlice.actions
export default counterSlice.reducer