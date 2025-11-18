function FocusLocationCard({ location, data }) {
  if (!data) {
    return (
      <article className={`focus-card ${location.accent ?? ''} skeleton`}>
        <div className="pulse" />
        <p>Получаем данные...</p>
      </article>
    )
  }

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <article className={`focus-card ${location.accent ?? ''}`}>
      <header className="focus-card__head">
        <div>
          <p className="eyebrow">{location.subtitle}</p>
          <h3>{location.title}</h3>
          <p className="meta">
            {data.location.city}, {data.location.country}
          </p>
        </div>
        <span className={`chip mini ${data.mode}`}>{data.mode === 'ready' ? 'Онлайн' : 'Демо'}</span>
      </header>

      <div className="timeline">
        {data.timeline.map((item) => (
          <div key={item.key} className="timeline-pill">
            <p className="label">{item.label}</p>
            <div className="reading">
              <div className="temp">{item.payload.temp}°C</div>
              <div className="secondary">{item.payload.condition.text}</div>
            </div>
            <div className="meta-grid">
              <span>Ощущается: {item.payload.feelsLike}°C</span>
              <span>Влажн.: {item.payload.humidity}%</span>
              <span>Ветер: {item.payload.wind} м/с</span>
              <span>Давление: {item.payload.pressure} hPa</span>
            </div>
            <div className="icon">
              <img src={item.payload.condition.icon} alt={item.payload.condition.text} />
              <span>{formatter.format(new Date(item.payload.time))}</span>
            </div>
          </div>
        ))}
      </div>

      <footer className="focus-card__footer">
        <small>Обновлено: {formatter.format(new Date(data.updated))}</small>
      </footer>
    </article>
  )
}

export default FocusLocationCard

