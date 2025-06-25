import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const AUTH_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const openweathermapApi = axios.create({
   baseURL: BASE_URL,
   params: {
      appid: AUTH_KEY,
      units: 'metric',
      lang: 'kr',
   },
})

//현재날씨
export const getCurrentWeather = async (cityName) => {
   const response = await openweathermapApi.get('/weather', {
      params: {
         q: cityName,
      },
   })
   return response
}

//5일날씨
export const getFiveDayForecast = async (cityName) => {
   const response = await openweathermapApi.get('/forecast', {
      params: {
         q: cityName,
      },
   })
   return response
}

export default openweathermapApi
