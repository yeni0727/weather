import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCurrentWeather, fetchFiveDayForecast } from '../features/weatherSlice'
import { Button } from '@mui/material'
import '../components/css/WeatherMain.css'

const WeatherMain = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { current: weather, forecast, loading, error } = useSelector((state) => state.weather)

   useEffect(() => {
      dispatch(fetchCurrentWeather('Incheon'))
      dispatch(fetchFiveDayForecast('Incheon'))
   }, [dispatch])

   if (loading) return <div>로딩중...</div>
   if (error) return <div>에러: {error}</div>
   if (!weather) return <div>데이터 로딩중</div>

   return (
      <div className="weather-main-container">
         {/* 현재 날씨 카드 */}
         <div className="weather-card current-weather-card">
            <h2>인천</h2> {/* {weather.name} */}
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="날씨 아이콘" />
            <p>온도: {weather.main.temp}°C</p>
            <p>날씨 상태: {weather.weather[0].description}</p>
            <p>체감 온도: {weather.main.feels_like}°C</p>
         </div>

         {/* 상세 정보 카드 */}
         <div className="weather-card detail-card">
            <h3>오늘의 날씨 상세 정보</h3>
            <Button variant="contained" onClick={() => navigate('/details')} className="card-button" style={{ marginBottom: '15px' }}>
               자세히 보기
            </Button>
            <div className="detail-info-container">
               <div className="detail-info-box">
                  <p>체감온도</p>
                  <p>{weather.main.feels_like}°C</p>
               </div>
               <div className="detail-info-box">
                  <p>습도</p>
                  <p>{weather.main.humidity}%</p>
               </div>
               <div className="detail-info-box">
                  <p>풍속</p>
                  <p>{weather.wind.speed} m/s</p>
               </div>
               <div className="detail-info-box">
                  <p>일출</p>
                  <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                  <p>일몰</p>
                  <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
               </div>
            </div>
         </div>
         {/* 5일 예보 카드 */}
         <div className="weather-card forecast-card">
            <h3>5일간 예보</h3>
            <Button variant="contained" onClick={() => navigate('/forecast')} style={{ marginBottom: '15px' }} className="card-button">
               자세히 보기
            </Button>
            {forecast ? (
               forecast.list
                  .filter((item) => item.dt_txt.includes('12:00:00'))
                  .slice(0, 5)
                  .map((item, index) => (
                     <div key={index} className="forecast-row">
                        <span className="forecast-date">{item.dt_txt.split(' ')[0]}</span>
                        <div className="forecast-right">
                           <span className="temp">{item.main.temp}°C</span>
                           <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} style={{ width: '30px', height: '30px' }} />
                        </div>
                     </div>
                  ))
            ) : (
               <div>예보없음</div>
            )}
         </div>
      </div>
   )
}

export default WeatherMain
