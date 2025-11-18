function RouteWeather({ route, weatherData, loading }) {
  if (!route) {
    return (
      <div className="route-empty">
        <p>Выберите маршрут, чтобы увидеть погоду по пути</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="route-loading">
        <div className="spinner" />
        <p>Загружаем погоду по маршруту...</p>
      </div>
    )
  }

  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="route-empty">
        <p>Нет данных о погоде для выбранного маршрута</p>
      </div>
    )
  }

  return (
    <div className="route-weather">
      <div className="route-header">
        <h4>
          {route.icon} {route.name}
        </h4>
        <p className="route-description">{route.description}</p>
      </div>
      <div className="route-steps">
        {weatherData.map((step, index) => (
          <div key={index} className="route-step">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <div className="step-header">
                <h5>{step.location}</h5>
              </div>
              <div className="step-intervals">
                {step.intervals?.map((interval, intervalIndex) => (
                  <div key={intervalIndex} className="interval-card">
                    <div className="interval-label">{interval.label}</div>
                    <div className="interval-time">{interval.time}</div>
                    <div className="step-weather">
                      <div className="step-temp">
                        <img src={interval.condition.icon} alt={interval.condition.text} />
                        <div>
                          <strong>{interval.temp}°C</strong>
                          <span>{interval.condition.text}</span>
                        </div>
                      </div>
                      <div className="step-details">
                        <span>Ощущается: {interval.feelsLike}°C</span>
                        <span>Ветер: {interval.wind} м/с</span>
                        <span>Влажность: {interval.humidity}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {index < weatherData.length - 1 && <div className="step-connector">→</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RouteWeather

