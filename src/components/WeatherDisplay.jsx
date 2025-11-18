import { useMemo } from 'react'

function WeatherDisplay({ weather, status, error, onRetry, temperatureUnit, moscowWeather, forecast, darkMode }) {
  if (!weather) {
    return (
      <div className="empty-state">
        <p>Выберите город, чтобы увидеть прогноз.</p>
      </div>
    )
  }

  const getTemperature = (temp, tempF) => {
    return temperatureUnit === 'F' ? tempF : temp
  }

  const getFeelsLikeColor = (feelsLike, temp) => {
    const diff = feelsLike - temp
    if (diff <= -5) return 'feels-cold'
    if (diff >= 5) return 'feels-hot'
    return 'feels-normal'
  }

  const temp = getTemperature(weather.temp, weather.tempF)
  const feelsLike = getTemperature(weather.feelsLike, weather.feelsLikeF)
  const tempMin = getTemperature(weather.tempRange[0], weather.tempRangeF[0])
  const tempMax = getTemperature(weather.tempRange[1], weather.tempRangeF[1])
  const feelsLikeColor = getFeelsLikeColor(weather.feelsLike, weather.temp)

  const tempDiff = moscowWeather
    ? temp - getTemperature(moscowWeather.temp, moscowWeather.tempF)
    : null

  const details = [
    {
      label: 'Ощущается как',
      value: `${feelsLike}°${temperatureUnit}`,
      colorClass: feelsLikeColor
    },
    { label: 'Влажность', value: `${weather.humidity}%` },
    { label: 'Давление', value: `${weather.pressure} hPa` },
    { label: 'Ветер', value: `${weather.wind} м/с` },
    { label: 'Мин.', value: `${tempMin}°${temperatureUnit}` },
    { label: 'Макс.', value: `${tempMax}°${temperatureUnit}` }
  ]

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr
  }

  return (
    <article className="weather-display">
      <div className="weather-head">
        <div>
          <p className="eyebrow">Погода сейчас</p>
          <h2>
            {weather.city}
            <span>{weather.country}</span>
          </h2>
          <div className="date-time">
            <p className="date">{formatDate(weather.date)}</p>
            <p className="time">Время: {formatTime(weather.time)}</p>
          </div>
        </div>
        <div className="icon-bubble">
          <img src={weather.condition.icon} alt={weather.condition.text} />
        </div>
      </div>

      <div className="weather-body">
        <div className="temperature-stack">
          <p className="temperature">
            {temp}°{temperatureUnit}
          </p>
          <p className="condition">
            <img src={weather.condition.icon} alt={weather.condition.text} className="condition-icon" />
            {weather.condition.text}
          </p>
          {tempDiff !== null && (
            <div className={`temp-diff ${tempDiff > 0 ? 'warmer' : tempDiff < 0 ? 'colder' : 'same'}`}>
              {tempDiff > 0 ? '↑' : tempDiff < 0 ? '↓' : '='} {Math.abs(tempDiff)}°{temperatureUnit} {tempDiff > 0 ? 'теплее' : tempDiff < 0 ? 'холоднее' : 'как'} Москвы
            </div>
          )}
          <span className={`mode-tag ${status}`}>{status === 'ready' ? 'Онлайн' : 'Демо'}</span>
        </div>

        <div className="detail-grid">
          {details.map((detail) => (
            <div key={detail.label} className={`detail-pill ${detail.colorClass || ''}`}>
              <p>{detail.label}</p>
              <strong>{detail.value}</strong>
            </div>
          ))}
        </div>
      </div>

      {forecast && forecast.length > 0 && (
        <div className="forecast-section">
          <h3>Прогноз на 3 дня</h3>
          <div className="forecast-grid">
            {forecast.map((day) => {
              const dayMax = getTemperature(day.day.maxtemp_c, day.day.maxtemp_f)
              const dayMin = getTemperature(day.day.mintemp_c, day.day.mintemp_f)
              const forecastDate = new Date(day.date)
              const dayName = forecastDate.toLocaleDateString('ru-RU', { weekday: 'short' })
              const dayNumber = forecastDate.getDate()
              const month = forecastDate.toLocaleDateString('ru-RU', { month: 'short' })

              return (
                <div key={day.dateEpoch} className="forecast-card">
                  <div className="forecast-date">
                    <strong>{dayName}</strong>
                    <span>
                      {dayNumber} {month}
                    </span>
                  </div>
                  <img src={day.day.condition.icon.startsWith('//') ? `https:${day.day.condition.icon}` : day.day.condition.icon} alt={day.day.condition.text} />
                  <div className="forecast-temps">
                    <span className="forecast-max">{dayMax}°</span>
                    <span className="forecast-min">{dayMin}°</span>
                  </div>
                  <p className="forecast-condition">{day.day.condition.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {error && (
        <div className="note warning">
          <div>
            <strong>Проблема с API:</strong> {error}
          </div>
          <button type="button" onClick={onRetry}>
            Повторить запрос
          </button>
        </div>
      )}
    </article>
  )
}

export default WeatherDisplay
