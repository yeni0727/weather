import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCurrentWeather } from '../features/weatherSlice'
import '../components/css/Detail.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Detail = () => {
   const { current: weather, loading, error } = useSelector((state) => state.weather)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      if (!weather) {
         dispatch(fetchCurrentWeather('Incheon'))
      }
   }, [dispatch, weather])

   if (loading) return <div>로딩중...</div>
   if (error) return <div>에러: {error}</div>
   if (!weather) return <div>데이터 로딩중</div>

   return (
      <div className="detailpage-card">
         <h1>오늘의 날씨 상세 정보</h1>
         <Button variant="contained" onClick={() => navigate('/')} size="small">
            메인으로 돌아가기
         </Button>
         <div className="weather-card current-weather-card">
            {/* <h2>{weather.name}</h2> */}
            <h2>인천</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="날씨 아이콘" />
            <p>온도: {weather.main.temp}°C</p>
            <p>날씨상태: {weather.weather[0].description}</p>
            {/* <p>체감 온도: {weather.main.feels_like}°C</p> */}
         </div>
         <div>
            <p>최고온도: {weather.main.temp_max}</p>
            <p>최저온도: {weather.main.temp_min}</p>
            <p>체감온도: {weather.main.feels_like}</p>
            <p>습도: {weather.main.humidity}%</p>
         </div>
         <div>
            <p>풍속: {weather.wind.speed}m/s</p>
            <p>풍향: {weather.wind.deg}도</p>
         </div>
         <div>
            <p>일출시간: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>일몰시간: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
         </div>
      </div>
   )
}

export default Detail
