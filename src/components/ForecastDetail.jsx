import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchFiveDayForecast } from '../features/weatherSlice'
import '../components/css/ForecastDetail.css'
import { Button } from '@mui/material'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const ForecastDetail = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { forecast, loading, error } = useSelector((state) => state.weather)

   useEffect(() => {
      dispatch(fetchFiveDayForecast('Incheon'))
   }, [dispatch])

   if (loading) return <div>로딩중...</div>
   if (error) return <div>에러: {error}</div>
   if (!forecast) return <div>데이터가 로딩중</div>

   //정오날씨
   const dailyForecasts = forecast.list.filter((item) => item.dt_txt.includes('12:00:00')).slice(0, 5)

   return (
      <div className="forecast-detailpage-card">
         <h1>5일간 예보(정오기준)</h1>
         <Button variant="contained" onClick={() => navigate('/')} size="small">
            메인으로 돌아가기
         </Button>

         <Swiper modules={[Mousewheel, Pagination]} direction="vertical" spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }} mousewheel={true} style={{ height: '600px' }}>
            {dailyForecasts.map((item, index) => (
               <SwiperSlide key={index}>
                  <div className="daily-forecast-card">
                     <h3>{item.dt_txt.split(' ')[0]}</h3>
                     <div className="forecast-content">
                        <div className="weather-icon">
                           <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="날씨 아이콘" />
                        </div>
                        <div className="weather-details">
                           <div className="detail-item">
                              <span>온도:</span>
                              <span>{item.main.temp}°C</span>
                           </div>
                           <div className="detail-item">
                              <span>체감온도:</span>
                              <span>{item.main.feels_like}°C</span>
                           </div>
                           <div className="detail-item">
                              <span>습도:</span>
                              <span>{item.main.humidity}%</span>
                           </div>
                           <div className="detail-item">
                              <span>풍속:</span>
                              <span>{item.wind.speed} m/s</span>
                           </div>
                           <div className="detail-item">
                              <span>구름량:</span>
                              <span>{item.clouds.all}%</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default ForecastDetail
