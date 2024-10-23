import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import WeatherApp from './components/WeatherApp/WeatherApp'
import LoginForm from './components/Login/LoginForm'
import SignUpForm from './components/SignUp/SignUpForm'
import Alert from './components/Alerts/Alert'
import PrivateRoute from './components/PrivateRoute'
import WeatherChart from './components/visualize'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/alert" element={<Alert />} />
          <Route path='/graph' element={<WeatherChart/>} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
