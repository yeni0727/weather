import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCurrentWeather, getFiveDayForecast } from '../api/openweathermapApi'

export const fetchCurrentWeather = createAsyncThunk('weather/fetchCurrentWeather', async (cityName) => {
   const response = await getCurrentWeather(cityName)
   return response.data
})

export const fetchFiveDayForecast = createAsyncThunk('weather/fetchFiveDayForecast', async (cityName) => {
   const response = await getFiveDayForecast(cityName)
   return response.data
})

const weatherSlice = createSlice({
   name: 'weather',
   initialState: {
      current: null,
      forecast: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchCurrentWeather.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
            state.loading = false
            state.current = action.payload
            state.error = null
         })
         .addCase(fetchCurrentWeather.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchFiveDayForecast.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchFiveDayForecast.fulfilled, (state, action) => {
            state.loading = false
            state.forecast = action.payload
         })
         .addCase(fetchFiveDayForecast.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default weatherSlice.reducer
