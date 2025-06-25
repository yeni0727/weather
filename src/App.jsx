import { Routes, Route } from 'react-router-dom'
import MainWeather from './pages/MainWeather'
import WeatherDetails from './pages/WeatherDetails'
import Forecast from './pages/Forecast'
import NotFound from './pages/NotFound'

function App() {
   return (
      <Routes>
         <Route path="/" element={<MainWeather />} />
         <Route path="/details" element={<WeatherDetails />} />
         <Route path="/forecast" element={<Forecast />} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App
