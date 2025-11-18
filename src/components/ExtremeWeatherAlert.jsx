function ExtremeWeatherAlert({ weather }) {
  if (!weather) return null

  const alerts = []

  if (weather.temp <= -20) {
    alerts.push({
      type: 'extreme-cold',
      message: '⚠️ Экстремальный холод! Температура ниже -20°C',
      icon: '🥶'
    })
  }

  if (weather.temp >= 35) {
    alerts.push({
      type: 'extreme-heat',
      message: '⚠️ Экстремальная жара! Температура выше 35°C',
      icon: '🔥'
    })
  }

  if (weather.wind && parseFloat(weather.wind) >= 15) {
    alerts.push({
      type: 'strong-wind',
      message: '⚠️ Сильный ветер! Скорость ветра более 15 м/с',
      icon: '💨'
    })
  }

  if (weather.condition?.code) {
    const code = weather.condition.code
    // Правильные коды грозы из WeatherAPI:
    // 1087 - возможна гроза
    // 1273, 1276, 1279, 1282 - грозы с дождем/снегом
    const stormCodes = [1087, 1273, 1276, 1279, 1282]
    if (stormCodes.includes(code)) {
      alerts.push({
        type: 'storm',
        message: '⚠️ Гроза! Оставайтесь в помещении',
        icon: '⛈️'
      })
    }
  }

  if (alerts.length === 0) return null

  return (
    <div className="extreme-weather-alerts">
      {alerts.map((alert, index) => (
        <div key={index} className={`extreme-alert ${alert.type}`}>
          <span className="alert-icon">{alert.icon}</span>
          <span className="alert-message">{alert.message}</span>
        </div>
      ))}
    </div>
  )
}

export default ExtremeWeatherAlert

