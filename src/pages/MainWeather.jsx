//메인 페이지
import WeatherMain from '../components/WeatherMain'

const MainWeather = () => {
   return (
      <div className="main-weather-page">
         <h1>인천 날씨</h1>
         <p>실시간 인천 날씨 정보를 확인하세요</p>
         <div className="card">
            <WeatherMain />
         </div>
      </div>
   )
}

export default MainWeather
