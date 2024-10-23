'use client'

import { useNavigate } from "react-router-dom"
import './AlertCard.css'
export default function WeatherAlertCard() {
//   const router = useRouter()
  const navigate = useNavigate()
  const handleCardClick = () => {
    // router.push('/alerts'
    navigate('/alert')
  }

  return (
    <div 
      className="weather-alert-card"
      onClick={handleCardClick}
    >
      <div className="card-header">
        <h2 className="card-title">Weather Alerts</h2>
      </div>
      <div className="card-content">
        <p className="card-description">
          Manage your weather alerts. Add new alerts or remove existing ones to stay informed about changing weather conditions.
        </p>
        <button className="manage-alerts-button">Manage Alerts</button>
      </div>
    </div>
  )
}